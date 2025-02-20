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

    if (column1 === column2 && row1 === row2) {
        return getCellName(range.c1);
    }

    return `${getCellName(range.c1)}:${getCellName(range.c2)}`;
}

function getCellName(cell) {
    const row = cell.row;
    const column = cell.column;

    if (ALPHABET[column - 1]) {
        return `${ALPHABET[column - 1]}${row}`;
    }

    const firstChar = Math.floor(column / 26);
    const secondChar = Math.floor(column % 26);

    return `${ALPHABET[firstChar - 1]}${ALPHABET[secondChar - 1]}${row}`;
}