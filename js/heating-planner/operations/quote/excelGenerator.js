//Project-specific
let EXCEL_ARRAY_BUFFER = null;

function startExcelExport(transportKm) { //Project-specific
    const summary = summaryCalculator.calculateSummary();
    summary.additionalElements.transport = transportKm || null;
    createExcelFile(summary);
}

async function createExcelFile(summary) {
    let roomNames = getRoomNames();
    if (!(roomNames && roomNames.length)) {
        return;
    }

    const context = { roomNames, summary };
    const workbook = await loadExcelTemplate();
    context.workbook = workbook;

    const summarySheet = workbook.getWorksheet(SUMMARY_SHEET_NAME);
    const blueprintSheet = workbook.getWorksheet(BLUEPRINT_SHEET_NAME);
    context.sheets = { summarySheet, blueprintSheet };

    createColumnsForRooms(context);
    fillRoomNames(context);
    fillPanelCounts(context);
    fillRoomSummaryFormulas(context);
    fillPanelCountFormulas(context);
    fillCoolingAndHeatingFormulas(context);
    fillPanelPriceFormulas(context);
    fillPanelPipeLengthFormulas(context);
    fillPanelAreaFormulas(context);
    fillSummaryTable(context);
    adjustRoomColumnWidths(context);

    addPicture(context);

    downloadExcel(context);
    displayMessage('A kalkulációt tartalmazó fájlt küldje el<br/>az sjb@apparat.hu e-mail címre.');
    return context;
}

async function loadExcelTemplate() {
    if (!EXCEL_ARRAY_BUFFER) {
        const response = await fetch(FILE_PATH);
        if (!response.ok) throw new Error("Failed to fetch Excel template from path " + FILE_PATH);
        EXCEL_ARRAY_BUFFER = await response.arrayBuffer();
    }

    const excel = new ExcelJS.Workbook();
    await excel.xlsx.load(EXCEL_ARRAY_BUFFER);
    return excel;
}

function downloadExcel(context) {
    const workbook = context.workbook;

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `apparat_excel_${Math.random().toString().substring(2)}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

function createColumnsForRooms(context) {
    const summarySheet = context.sheets.summarySheet;
    const roomNames = context.roomNames;

    let i = 1;
    while (i++ < roomNames.length) {
        summarySheet.spliceColumns(9, 0, [...emptyCells(16)]);
        summarySheet.eachRow((row, rowIndex) => {
            const sourceCell = row.getCell(8);
            const targetCell = row.getCell(9);

            targetCell.value = sourceCell.value;
            targetCell.style = { ...sourceCell.style };
            targetCell.formula = sourceCell.formula;
        });
    }
}

function fillRoomNames(context) {
    const roomNames = context.roomNames;
    const summarySheet = context.sheets.summarySheet;
    const row = summarySheet.getRow(2);
    let column = 8;

    roomNames.forEach(roomName => row.getCell(column++).value = roomName);
}

function fillPanelCounts(context) {
    const roomNames = context.roomNames;
    const summarySheet = context.sheets.summarySheet;
    const summary = context.summary;

    let rowIndex = 3;
    while (rowIndex < 10) {
        let columnIndex = 7;

        const row = summarySheet.getRow(rowIndex);
        const panelType = row.getCell(columnIndex++).value;

        for (let roomName of roomNames) {
            const count = summary[roomName][panelType]?.count;
            row.getCell(columnIndex++).value = count;
        }
        rowIndex++;
    }
}

function fillRoomSummaryFormulas(context) {
    const roomNames = context.roomNames;
    const summarySheet = context.sheets.summarySheet;

    let columnIndex = 8;
    for (let roomName of roomNames) {
        let coolingFormula = [];
        let heatingFormula = [];
        let roundsFormula = [];
        let areaFormula = [];

        let rowIndex = 3;
        while (rowIndex < 10) {
            const cellName = getCellName({ column: columnIndex, row: rowIndex });
            coolingFormula.push(`${cellName}*${getCellName({ column: 4, row: rowIndex, dollars: '$$' })}`);
            heatingFormula.push(`${cellName}*${getCellName({ column: 5, row: rowIndex, dollars: '$$' })}`);
            roundsFormula.push(`${cellName}*${getCellName({ column: 6, row: rowIndex, dollars: '$$' })}`);
            areaFormula.push(`${cellName}*${getCellName({ column: 3, row: rowIndex, dollars: '$$' })}`);
            rowIndex++;
        }
        coolingFormula = coolingFormula.join('+');
        heatingFormula = heatingFormula.join('+');

        roundsFormula = roundsFormula.join('+');
        const roundsFormulaDivide = `((${roundsFormula})/130)`;
        roundsFormula = ROUNDUP(roundsFormulaDivide, 0);
        areaFormula = areaFormula.join('+');

        setFormula(summarySheet.getRow(12).getCell(columnIndex), coolingFormula);
        setFormula(summarySheet.getRow(13).getCell(columnIndex), heatingFormula);
        setFormula(summarySheet.getRow(15).getCell(columnIndex), roundsFormula);
        setFormula(summarySheet.getRow(16).getCell(columnIndex), areaFormula);

        columnIndex++;
    }

    const lastRoomColumn = 7 + roomNames.length;
    setFormula(summarySheet.getRow(15).getCell(7), SUM(getRangeName({ c1: { row: 15, column: 8 }, c2: { row: 15, column: lastRoomColumn } })));
    setFormula(summarySheet.getRow(16).getCell(7), SUM(getRangeName({ c1: { row: 16, column: 8 }, c2: { row: 16, column: lastRoomColumn } })));

    context.lastRoomColumn = lastRoomColumn;
}

function fillPanelCountFormulas(context) {
    const summarySheet = context.sheets.summarySheet;
    const lastRoomColumn = context.lastRoomColumn;
    const targetColumn = lastRoomColumn + 2;
    context.panelCountColumn = targetColumn;

    let rowIndex = 3;
    while (rowIndex < 10) {
        const range = { c1: { row: rowIndex, column: 8 }, c2: { row: rowIndex, column: lastRoomColumn } };
        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumn), SUM(getRangeName(range)));
        rowIndex++;
    }

    const columnSumRange = getRangeName({ c1: { row: 3, column: targetColumn }, c2: { row: 9, column: targetColumn } });
    setFormula(summarySheet.getRow(11).getCell(targetColumn), SUM(columnSumRange));
}

function fillCoolingAndHeatingFormulas(context) {
    const summarySheet = context.sheets.summarySheet;
    const lastRoomColumn = context.lastRoomColumn;

    const countColumn = context.panelCountColumn;
    const targetColumnCooling = lastRoomColumn + 3;
    const targetColumnHeating = targetColumnCooling + 1;

    context.panelCoolingColumn = targetColumnCooling;
    context.panelHeatingColumn = targetColumnHeating;

    let rowIndex = 3;
    while (rowIndex < 10) {
        const coolingCell = { row: rowIndex, column: 4 };
        const heatingCell = { row: rowIndex, column: 5 };
        const countCell = { row: rowIndex, column: countColumn };

        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumnCooling), `${getCellName(coolingCell)}*${getCellName(countCell)}`);
        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumnHeating), `${getCellName(heatingCell)}*${getCellName(countCell)}`);
        rowIndex++;
    }

    for (let targetColumn of [targetColumnCooling, targetColumnHeating]) {
        const columnSumRange = getRangeName({ c1: { row: 3, column: targetColumn }, c2: { row: 9, column: targetColumn } });
        setFormula(summarySheet.getRow(11).getCell(targetColumn), SUM(columnSumRange));
    }
}

function fillPanelPriceFormulas(context) {
    const summarySheet = context.sheets.summarySheet;
    const lastRoomColumn = context.lastRoomColumn;

    const panelCountsColumn = context.panelCountColumn;
    const targetColumn = lastRoomColumn + 5;
    context.panelPriceColumn = targetColumn;

    let rowIndex = 3;
    while (rowIndex < 10) {
        const type = summarySheet.getRow(rowIndex).getCell(7).value;
        const price = alap('B' + ALAP_ROW[type]);

        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumn), `${getCellName({ row: rowIndex, column: panelCountsColumn })}*${price}`);
        rowIndex++;
    }

    const columnSumRange = getRangeName({ c1: { row: 3, column: targetColumn }, c2: { row: 9, column: targetColumn } });
    setFormula(summarySheet.getRow(11).getCell(targetColumn), SUM(columnSumRange));
}

function fillPanelPipeLengthFormulas(context) {
    const summarySheet = context.sheets.summarySheet;
    const lastRoomColumn = context.lastRoomColumn;

    const panelCountsColumn = context.panelCountColumn;
    const targetColumn = lastRoomColumn + 6;
    context.panelPipeLengthColumn = targetColumn;

    let rowIndex = 3;
    while (rowIndex < 10) {
        const pipeLength = getCellName({ row: rowIndex, column: 6 });

        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumn), `${getCellName({ row: rowIndex, column: panelCountsColumn })}*${pipeLength}`);
        rowIndex++;
    }

    const columnSumRange = getRangeName({ c1: { row: 3, column: targetColumn }, c2: { row: 9, column: targetColumn } });
    setFormula(summarySheet.getRow(11).getCell(targetColumn), SUM(columnSumRange));
}

function fillPanelAreaFormulas(context) {
    const summarySheet = context.sheets.summarySheet;
    const lastRoomColumn = context.lastRoomColumn;

    const panelCountsColumn = context.panelCountColumn;
    const targetColumn = lastRoomColumn + 7;
    context.panelAreaColumn = targetColumn;

    let rowIndex = 3;
    while (rowIndex < 10) {
        const area = getCellName({ row: rowIndex, column: 3 });

        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumn), `${getCellName({ row: rowIndex, column: panelCountsColumn })}*${area}`);
        rowIndex++;
    }

    const columnSumRange = getRangeName({ c1: { row: 3, column: targetColumn }, c2: { row: 9, column: targetColumn } });
    setFormula(summarySheet.getRow(11).getCell(targetColumn), SUM(columnSumRange));
}

function fillSummaryTable(context) {
    const summarySheet = context.sheets.summarySheet;

    const firstColumn = context.panelAreaColumn;
    const secondColumn = firstColumn + 1;

    const panelAreaColumn = context.panelAreaColumn;
    const panelPriceColumn = context.panelPriceColumn;
    const additionalElements = context.summary.additionalElements;
    let rowIndex = 13;

    // panelok összesen
    let row = summarySheet.getRow(rowIndex);
    let firstCell = row.getCell(firstColumn);
    let secondCell = row.getCell(secondColumn);

    setFormula(firstCell, getCellName({ row: 11, column: panelAreaColumn }));
    setFormula(secondCell, getCellName({ row: 11, column: panelPriceColumn }));
    rowIndex++;

    // T-idomok
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);

    const panelCountCellAddress = summarySheet.getRow(11).getCell(context.panelCountColumn).address;
    const numberOfRoundsCellAddress = summarySheet.getRow(15).getCell(7).address;

    setFormula(firstCell, `(${panelCountCellAddress} - ${numberOfRoundsCellAddress})*2`);
    let elementSummary = additionalElements.tElements || 0;
    setFormula(secondCell, `${getCellName({ row: rowIndex, column: firstColumn })}*${alap('B9')}`);
    rowIndex++;

    // Szűkítő
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);

    const tElementsCellAddress = summarySheet.getRow(rowIndex - 1).getCell(firstColumn).address;
    setFormula(firstCell, `${panelCountCellAddress}*2 - ${tElementsCellAddress}`);
    setFormula(secondCell, `${getCellName({ row: rowIndex, column: firstColumn })}*${alap('B10')}`);
    rowIndex++;

    // osztógyüjtő
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);

    const collectorConfig = getCollectorConfig(context);
    const collectorsOptionsRange = addOptionTableAndReturnOptionsRange(summarySheet, secondColumn + 5, alapPair('A', 'B', 14, 24), true);
    createDropDown(firstCell, collectorsOptionsRange.dropdown);
    firstCell.value = collectorConfig.first;
    setFormula(secondCell, IFERROR(VLOOKUP(firstCell.address, collectorsOptionsRange.searchTable, 2, 'FALSE'), 0));
    rowIndex++;

    // osztógyüjtő
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);

    createDropDown(row.getCell(firstColumn), collectorsOptionsRange.dropdown);
    firstCell.value = collectorConfig.second;
    setFormula(secondCell, IFERROR(VLOOKUP(firstCell.address, collectorsOptionsRange.searchTable, 2, 'FALSE'), 0));
    rowIndex++;

    // CD30/60
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);
    elementSummary = additionalElements.cd30_60 || 0;
    firstCell.value = elementSummary.count;
    setFormula(secondCell, `${getCellName({ row: rowIndex, column: firstColumn })}*${alap('B27')}`);
    rowIndex++;

    // UD30
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);
    elementSummary = additionalElements.ud30 || 0;
    firstCell.value = elementSummary.count;
    setFormula(secondCell, `${getCellName({ row: rowIndex, column: firstColumn })}*${alap('B28')}`);
    rowIndex++;

    // gerinc cső+héj 16x2
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);
    elementSummary = additionalElements.mainlineTube || 0;
    setFormula(firstCell, `${numberOfRoundsCellAddress}*20`);
    setFormula(secondCell, `${getCellName({ row: rowIndex, column: firstColumn })}*${alap('B12')}`);
    rowIndex++;

    // eurokónusz
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);
    elementSummary = additionalElements.eurokonusz || 0;
    setFormula(firstCell, `${numberOfRoundsCellAddress}*2`);
    setFormula(secondCell, `${getCellName({ row: rowIndex, column: firstColumn })}*${alap('B13')}`);
    rowIndex++;

    // osztószekrény
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);

    const distBoxOptionsRange = addOptionTableAndReturnOptionsRange(summarySheet, secondColumn + 8, PRICES.distBox);
    createDropDown(firstCell, distBoxOptionsRange.dropdown);
    firstCell.value = NEM_KELL;
    setFormula(secondCell, VLOOKUP(firstCell.address, distBoxOptionsRange.searchTable, 2, 'FALSE'));
    rowIndex++;

    // osztószekrény
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);

    createDropDown(firstCell, distBoxOptionsRange.dropdown);
    firstCell.value = NEM_KELL;
    setFormula(secondCell, VLOOKUP(firstCell.address, distBoxOptionsRange.searchTable, 2, 'FALSE'));
    rowIndex += 3;

    // szállítás
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(firstColumn);
    secondCell = row.getCell(secondColumn);
    const transport = additionalElements.transport || null;

    firstCell.value = transport;
    setFormula(secondCell, IF(`${firstCell.address}>0`, `${alap('B26')}*${firstCell.address}+${alap('B25')}`, 0));
    rowIndex++;

    // Összesen bruttó anyagdíj
    row = summarySheet.getRow(rowIndex);
    secondCell = row.getCell(secondColumn);
    setFormula(secondCell, SUM(getRangeName({ c1: { row: 13, column: secondColumn }, c2: { row: rowIndex - 2, column: secondColumn } })));
    rowIndex = 13;

    // Másik kicsi tábla
    const column = context.panelHeatingColumn;
    row = summarySheet.getRow(rowIndex);
    firstCell = row.getCell(column);
    setFormula(firstCell, SUM(getRangeName({ c1: { row: 13, column: secondColumn }, c2: { row: 26, column: secondColumn } })));
    rowIndex++;

    row = summarySheet.getRow(rowIndex);
    secondCell = row.getCell(column);
    secondCell.value = 0;
    rowIndex += 2;

    row = summarySheet.getRow(rowIndex);
    const thirdCell = row.getCell(column);
    setFormula(thirdCell, SUM(`${firstCell.address}:${secondCell.address}`));
}

function adjustRoomColumnWidths(context) {
    const summarySheet = context.sheets.summarySheet;

    let columnIndex = 8;
    while (columnIndex <= context.lastRoomColumn) {
        summarySheet.getColumn(columnIndex++).width = 18;
    }
}

function addPicture(context) {
    const workbook = context.workbook;
    const blueprintSheet = context.sheets.blueprintSheet;
    const beforeScreenData = { x: screenSumDrag.x, y: screenSumDrag.y, zoom: screenZoom };
    const canvasOriginalSize = getCanvasSize();
    
    try {
        const docSize = getDocumentDimensions();
        const screenWidth = docSize.vw;
        const screenHeight = docSize.vh;
        
        const contentSize = getBlueprintContentSize();
        const contentWidth = screenZoom * contentSize.w + 100;
        const contentHeight = screenZoom * contentSize.h + 100;
        resizeCanvas(contentWidth + LEFT_RIBBON_WIDTH, contentHeight + TOP_RIBBON_HEIGHT);
        adjustScreenForExport();
        draw();

        let buffer = createGraphics(contentWidth, contentHeight);
        extracted = get(LEFT_RIBBON_WIDTH, TOP_RIBBON_HEIGHT, contentWidth, contentHeight);
        buffer.image(extracted, 0, 0);

        const base64Image = buffer.elt.toDataURL("image/png");

        const imageId = workbook.addImage({
            buffer: base64ToArrayBuffer(base64Image.split(',')[1]),
            extension: "png"
        });

        blueprintSheet.addImage(imageId, {
            tl: { col: 0, row: 0 },
            ext: { width: contentWidth, height: contentHeight }
        });


    } finally {
        screenSumDrag = {x: beforeScreenData.x, y: beforeScreenData.y};
        screenZoom = beforeScreenData.zoom;
        resizeCanvas(canvasOriginalSize.x, canvasOriginalSize.y);
    }
}

function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}