/**
 * Projekt specifikus excel konstansok
 */
export const HeatingPlannerExcelConstants = {
    SUMMARY_SHEET_NAME: 'Ajánlat részletek',
    BLUEPRINT_SHEET_NAME: 'Tervrajz',
    COOLING_UNIT_PERFORMANCE: 60.7,
    HEATING_UNIT_PERFORMANCE: 73.6,
    SECOND_LINE_FIRST_HALF: ['Lemez hossz', 'Ívtől ívig hossz', 'Felület', 'Hűtés', 'Fűtés', 'Cső hossza', 'Termék név'],
    SECOND_LINE_SECOND_HALF: ['Termék név', 'Darabszám', 'Össz hűtő teljesítmény', 'Össz Fűtő teljesítmény', 'Panelok összesen', 'Csőhossz', 'Felület'],
    HEADER_COLOR: 'BFBFBF',
    FILE_PATH: 'xlsx/TEMPLATE.xlsx',
    ALPHABET: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    ALAP_ROW: {
        'F100': 2,
        'F150': 3,
        'F200': 4,
        'F250': 5,
        'F300': 6,
        'F350': 7,
        'F400': 8
    }
};
