// -- TEST --

const testSummary = '{"konyha":{"F400":{"count":7,"unitPrice":400,"price":2800},"count":7,"numberOfRounds":2},"wc":{"F250":{"count":3,"unitPrice":250,"price":750},"count":3,"numberOfRounds":1},"háló":{"F300":{"count":6,"unitPrice":300,"price":1800},"count":6,"numberOfRounds":2},"count":16,"numberOfRounds":5,"additionalElements":{"tElements":{"count":22,"unitPrice":20,"price":440},"confusors":{"count":10,"unitPrice":25,"price":250},"collectors":{"count":5,"unitPrice":25,"price":125},"mainlineTube":{"count":100,"unitPrice":10,"price":1000},"eurokonusz":{"count":10,"unitPrice":5,"price":50},"ud30":{"count":10000000,"unitPrice":10,"price":100000000},"cd30_60":{"count":10000000,"unitPrice":10,"price":100000000},"count":20000147}}';
const testSummaryObject = JSON.parse(testSummary);

let testContext;
function testExport() {
    createExcelFile(testSummaryObject).then(c => testContext = c);
}

// -- TEST --

let excelArrayBuffer = null;

async function createExcelFile(summary) {
    let roomNames = roomContext.getRoomNames();
    if (!(roomNames && roomNames.length)) {
        roomNames = ['konyha', 'wc', 'háló'];
        //return;
    }

    const context = {roomNames, summary};
    const workbook = await loadExcelTemplate();
    context.workbook = workbook;

    const summarySheet = workbook.getWorksheet(SUMMARY_SHEET_NAME);
    const blueprintSheet = workbook.getWorksheet(BLUEPRINT_SHEET_NAME);
    context.sheets = {summarySheet, blueprintSheet};

    createColumnsForRooms(context);
    fillRoomNames(context);
    fillPanelCounts(context);
    fillRoomSummaryFormulas(context);
    fillPanelCountFormulas(context);
    fillCoolingAndHeatingFormulas(context);

    // add content
    // add picture
    // pack up and download
    // downloadExcel(context);
    return context;
}

async function loadExcelTemplate() {
    if (!excelArrayBuffer) {
        const response = await fetch(FILE_PATH);
        if (!response.ok) throw new Error("Failed to fetch Excel template from path " + FILE_PATH);
        excelArrayBuffer = await response.arrayBuffer();
    }
    
    const excel = new ExcelJS.Workbook();
    await excel.xlsx.load(excelArrayBuffer);
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
            const cellName = getCellName({column: columnIndex, row: rowIndex});
            coolingFormula.push(`${cellName}*${getCellName({column: 4, row: rowIndex, dollars: '$$'})}`);
            heatingFormula.push(`${cellName}*${getCellName({column: 5, row: rowIndex, dollars: '$$'})}`);
            roundsFormula.push(`${cellName}*${getCellName({column: 6, row: rowIndex, dollars: '$$'})}`);
            areaFormula.push(`${cellName}*${getCellName({column: 3, row: rowIndex, dollars: '$$'})}`);
            rowIndex++;
        }
        coolingFormula = coolingFormula.join('+');
        heatingFormula = heatingFormula.join('+');

        roundsFormula = roundsFormula.join('+');
        roundsFormula = `ROUNDUP(((${roundsFormula})/130),0)`;
        areaFormula = areaFormula.join('+');

        setFormula(summarySheet.getRow(12).getCell(columnIndex), coolingFormula);
        setFormula(summarySheet.getRow(13).getCell(columnIndex), heatingFormula);
        setFormula(summarySheet.getRow(15).getCell(columnIndex), roundsFormula);
        setFormula(summarySheet.getRow(16).getCell(columnIndex), areaFormula);
        
        columnIndex++;
    }

    const lastRoomColumn = 7 + roomNames.length;
    setFormula(summarySheet.getRow(15).getCell(7), `SUM(${getRangeName({c1: {row: 15, column: 8}, c2: {row: 15, column: lastRoomColumn}})})`);
    setFormula(summarySheet.getRow(16).getCell(7), `SUM(${getRangeName({c1: {row: 16, column: 8}, c2: {row: 16, column: lastRoomColumn}})})`);

    context.lastRoomColumn = lastRoomColumn;
}

function fillPanelCountFormulas(context) {
    const summarySheet = context.sheets.summarySheet;
    const lastRoomColumn = context.lastRoomColumn;
    const targetColumn = lastRoomColumn + 2;

    let rowIndex = 3;
    while (rowIndex < 10) {
        const range = {c1: {row: rowIndex, column: 8}, c2: {row: rowIndex, column: lastRoomColumn}};
        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumn), `SUM(${getRangeName(range)})`);
        rowIndex++;
    }
}

function fillCoolingAndHeatingFormulas(context) {
    const summarySheet = context.sheets.summarySheet;
    const lastRoomColumn = context.lastRoomColumn;

    const countColumn = lastRoomColumn + 2;
    const targetColumnCooling = lastRoomColumn + 3;
    const targetColumnHeating = targetColumnCooling + 1;

    let rowIndex = 3;
    while (rowIndex < 10) {
        const coolingCell = {row: rowIndex, column: 4};
        const heatingCell = {row: rowIndex, column: 5};
        const countCell = {row: rowIndex, column: countColumn};
        
        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumnCooling), `${getCellName(coolingCell)}*${getCellName(countCell)}`);
        setFormula(summarySheet.getRow(rowIndex).getCell(targetColumnHeating), `${getCellName(heatingCell)}*${getCellName(countCell)}`);
        rowIndex++;
    }
}