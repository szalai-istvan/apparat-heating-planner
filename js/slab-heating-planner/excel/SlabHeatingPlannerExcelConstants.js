/**
 * Födémfűtő Excel konstansok.
 */
export const SlabHeatingPlannerExcelConstants = {
    path: 'xlsx/SLAB_HEATING_TEMPLATE_{language}.xlsx',
    summarySheetName: 'Számolgatós',
    blueprintSheetName: 'Alaprajz',

    pipePricePerMeter: 160,
    slabHeaterPricePerSquareMeter: 6500,
    boxPricePerPiece: 1000,
    transportPrice: {
        a: 240,
        b: 20000
    }
};