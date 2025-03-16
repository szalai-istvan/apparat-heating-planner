declare function getNumberOfRows(sheet: any): any;
declare function emptyCells(n: any): any[];
declare function fillRangeWithColor(range: any, color: any): void;
declare function getRangeName(range: any): string;
declare function getCellName(cell: any): string;
declare function setFormula(cell: any, formula: any): void;
declare function addOptionTableAndReturnOptionsRange(sheet: any, column: any, options: any): {
    dropdown: string;
    searchTable: string;
};
declare function createDropDown(cell: any, options: any): void;
declare function ROUNDUP(subFormula: any, digits: any): string;
declare function SUM(subFormula: any): string;
declare function VLOOKUP(searchValue: any, searchTable: any, column: any, rangeSearch: any): string;
declare function IF(condition: any, valueIfTrue: any, valueIfFalse: any): string;
