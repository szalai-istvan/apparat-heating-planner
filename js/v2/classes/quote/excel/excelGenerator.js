const testSummary = '{"konyha":{"F400":{"count":7,"unitPrice":400,"price":2800},"count":7,"numberOfRounds":2},"wc":{"F250":{"count":3,"unitPrice":250,"price":750},"count":3,"numberOfRounds":1},"háló":{"F300":{"count":6,"unitPrice":300,"price":1800},"count":6,"numberOfRounds":2},"count":16,"numberOfRounds":5,"additionalElements":{"tElements":{"count":22,"unitPrice":20,"price":440},"confusors":{"count":10,"unitPrice":25,"price":250},"collectors":{"count":5,"unitPrice":25,"price":125},"mainlineTube":{"count":100,"unitPrice":10,"price":1000},"eurokonusz":{"count":10,"unitPrice":5,"price":50},"ud30":{"count":10000000,"unitPrice":10,"price":100000000},"cd30_60":{"count":10000000,"unitPrice":10,"price":100000000},"count":20000147}}';
const testSummaryObject = JSON.parse(testSummary);

function testExport() {
    createExcelFile(testSummaryObject);
}

function createExcelFile(summary) {
    const roomNames = roomContext.getRoomNames();
    if (!(roomNames && roomNames.length)) {
        return;
    }

    const context = {input: {roomNames, summary}};
    const workbook = new ExcelJS.Workbook();
    context.workbook = {workbook};

    const summarySheet = workbook.addWorksheet(SUMMARY_SHEET_NAME);
    const blueprintSheet = workbook.addWorksheet(BLUEPRINT_SHEET_NAME);
    context.workbook.sheets = {summarySheet, blueprintSheet};

    const columns = 15 + roomNames.length;
    context.workbook.sheets.columns = {summarySheet: columns};
    addHeaderRows(context);
    // add content
    // add picture
    // pack up and download
    downloadExcel(context);
}

function addHeaderRows(context) {
    const summarySheet = context.workbook.sheets.summarySheet;
    const columns = context.workbook.sheets.columns.summarySheet;

    const firstRow = summarySheet.addRow([...emptyCells(columns)]);
    const secondRow = summarySheet.addRow(getSecondLine(context));
    fillRangeWithColor(secondRow, HEADER_COLOR);

}

function emptyCells(n) {
    return Array(n).fill(null);
}

function getSecondLine(context) {
    const roomNames = context.input.roomNames;
    return [...SECOND_LINE_FIRST_HALF, ...roomNames, ...SECOND_LINE_SECOND_HALF]
}

function fillRangeWithColor(range, color) {
    range.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: color }
    };
}

function downloadExcel(context) {
    const workbook = context.workbook.workbook;

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