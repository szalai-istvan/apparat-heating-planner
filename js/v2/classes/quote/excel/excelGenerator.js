// -- TEST --

const testSummary = '{"konyha":{"F400":{"count":7,"unitPrice":400,"price":2800},"count":7,"numberOfRounds":2},"wc":{"F250":{"count":3,"unitPrice":250,"price":750},"count":3,"numberOfRounds":1},"háló":{"F300":{"count":6,"unitPrice":300,"price":1800},"count":6,"numberOfRounds":2},"count":16,"numberOfRounds":5,"additionalElements":{"tElements":{"count":22,"unitPrice":20,"price":440},"confusors":{"count":10,"unitPrice":25,"price":250},"collectors":{"count":5,"unitPrice":25,"price":125},"mainlineTube":{"count":100,"unitPrice":10,"price":1000},"eurokonusz":{"count":10,"unitPrice":5,"price":50},"ud30":{"count":10000000,"unitPrice":10,"price":100000000},"cd30_60":{"count":10000000,"unitPrice":10,"price":100000000},"count":20000147}}';
const testSummaryObject = JSON.parse(testSummary);

let testContext;
async function testExport() {
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

    // const summarySheet = workbook.addWorksheet(SUMMARY_SHEET_NAME);
    // const blueprintSheet = workbook.addWorksheet(BLUEPRINT_SHEET_NAME);
    const summarySheet = workbook.getWorksheet(SUMMARY_SHEET_NAME);
    const blueprintSheet = workbook.getWorksheet(BLUEPRINT_SHEET_NAME);
    context.sheets = {summarySheet, blueprintSheet};

    const columns = 15 + roomNames.length;
    context.columns = {summarySheet: columns};

    // Kell elég oszlop
    createColumnsForRooms(context);
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
        link.download = "edited_data_with_borders.xlsx";
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