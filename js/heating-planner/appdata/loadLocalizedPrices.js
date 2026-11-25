import { ApplicationState } from "../../common/appdata/ApplicationState.js";
import { ErrorCodes } from "../../common/errors/ErrorCodes.js";
import { Errors } from "../../common/errors/Errors.js";
import { WorkbookWrapper } from "../../common/excel/WorkbookWrapper.js";
import { HeatingPlannerConstants } from "./HeatingPlannerConstants.js";

let PRICES = undefined;

/**
 * Betölti XLSX assetből az árakat.
 * 
 * @returns {object}
 */
async function loadPricesFromXlsx() {
    const response = await fetch(HeatingPlannerConstants.priceExcel.path);
    if (!response.ok) {
        throw new Error("Failed to load price XLSX file ");
    }

    const arrayBuffer = await response.arrayBuffer();
    const excel = new ExcelJS.Workbook();
    await excel.xlsx.load(arrayBuffer);
    const workbook = new WorkbookWrapper(excel);
    workbook.selectSheetByName(HeatingPlannerConstants.priceExcel.sheetName);
    
    PRICES = {
        hu: buildPricesObjectFromColumn(workbook, 4), 
        ro: buildPricesObjectFromColumn(workbook, 6)
    };
}

/**
 * Árakat tartalmazó objektum felépítése egy országhoz
 * 
 * @param {WorkbookWrapper} workbook 
 * @param {number} column 
 * @returns {object}
 */
function buildPricesObjectFromColumn(workbook, column) {
    const prices = {};
    let row = 4;
    while (true) {
        const jsonKey = workbook.readCell(row, 2) || undefined;
        const price = Number(workbook.readCell(row, column)) || 0;

        if (!jsonKey) {
            break;
        }

        const jsonPath = jsonKey.split('.');
        let destination = prices;
        for (let i = 0; i < jsonPath.length - 1; i++) {
            const path = jsonPath[i];
            if (!(path in destination)) {
                destination[path] = {};
            }
            destination = destination[path];
        }

        const priceKey = jsonPath[jsonPath.length - 1];
        destination[priceKey] = price;
        row++;
    }

    return prices;
}

function retrieveLocalPrices() {
    if (!PRICES) {
        loadPricesFromXlsx()
            .then(() => HeatingPlannerConstants.prices = PRICES[ApplicationState.language])
            .catch(e => {
                try {
                    Errors.throwError(ErrorCodes.ERROR_LOADING_PRICES);
                } catch (e) {
                    Errors.handleError(e);
                }
            });
    } else {
        HeatingPlannerConstants.prices = PRICES[ApplicationState.language];
    }
}

/**
 * Lokalizált árbetöltő műveletek
 */
export const LoadLocalizedPrices = {
    retrieveLocalPrices
};