function getNumberOfRows(sheet) {
    return sheet._rows.length;
}

function emptyCells(n) {
    return Array(n).fill(null);
}


function fillRangeWithColor(range, color) {
    range.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: color }
    };
}

function getRangeName(range) {
    const column1 = range.c1.column;
    const column2 = range.c2.column;
    const row1 = range.c1.row;
    const row2 = range.c2.row;
    const dollars1 = range.c1.dollars;
    const dollars2 = range.c2.dollars;

    if (column1 === column2 && row1 === row2) {
        return getCellName(range.c1);
    }

    return `${getCellName(range.c1)}:${getCellName(range.c2)}`;
}

function getCellName(cell) {
    const row = cell.row;
    const column = cell.column;
    const dollars = cell.dollars || '__';
    const d1 = dollars[0] === '$' ? '$' : '';
    const d2 = dollars[1] === '$' ? '$' : '';

    if (ALPHABET[column - 1]) {
        return `${d1}${ALPHABET[column - 1]}${d2}${row}`;
    }

    const firstChar = Math.floor(column / 26);
    const secondChar = Math.floor(column % 26);

    return `${d1}${ALPHABET[firstChar - 1]}${ALPHABET[secondChar - 1]}${d2}${row}`;
}

function setFormula(cell, formula) {
    cell.formula = formula;
    cell.formulaType = 1;
    cell.value = { formula };
}

function addOptionTableAndReturnOptionsRange(sheet, column, options) {
    let rowIndex = 1;
    for (let key in options) {
        value = options[key];
        sheet.getRow(rowIndex).getCell(column).value = key;
        sheet.getRow(rowIndex).getCell(column + 1).value = value;
        rowIndex++;
    }

    sheet.getColumn(column).hidden = true;
    sheet.getColumn(column + 1).hidden = true;
    return {
        dropdown: getRangeName({ c1: { row: 1, column: column, dollars: '$$' }, c2: { row: rowIndex - 1, column: column, dollars: '$$' } }),
        searchTable: getRangeName({ c1: { row: 1, column: column, dollars: '$$' }, c2: { row: rowIndex - 1, column: column + 1, dollars: '$$' } })
    };
}

function createDropDown(cell, options) {
    cell.dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: [options],
        showDropDown: true
    };
}


function ROUNDUP(subFormula, digits) {
    return `ROUNDUP(${subFormula}, ${digits})`;
}

function SUM(subFormula) {
    return `SUM(${subFormula})`;
}

function VLOOKUP(searchValue, searchTable, column, rangeSearch) {
    rangeSearch = rangeSearch ?? 'FALSE';
    return `VLOOKUP(${searchValue}, ${searchTable}, ${column}, ${rangeSearch})`;
}

function IF(condition, valueIfTrue, valueIfFalse) {
    return `IF(${condition}, ${valueIfTrue}, ${valueIfFalse})`;
}