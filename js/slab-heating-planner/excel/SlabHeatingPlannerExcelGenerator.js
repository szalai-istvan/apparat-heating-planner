import { WorkbookWrapper } from "../../common/excel/WorkbookWrapper.js";
import { SlabHeaterGroupService } from "../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../service/SlabHeaterService.js";
import { SlabHeatingPlannerExcelConstants } from "./SlabHeatingPlannerExcelConstants.js";

/** @type {ArrayBuffer} */
let excelArrayBuffer = null;

/**
 * Legenerálja az összesítőt, árkalkulációt és a végleges tervrajzot tartalmazó Excel fájlt.
 * 
 * @returns {Promise<undefined>}
 */
async function generateExcel() {
    const workbook = await loadExcelTemplate();

    fillOutSlabHeaterData(workbook);
    workbook.selectSheetByName(SlabHeatingPlannerExcelConstants.blueprintSheetName);
    workbook.exportBlueprint();

    workbook.download();
}

/**
 * Létrehozza az Excel munkafüzetet
 * 
 * @returns {Promise<WorkbookWrapper>}
 */
async function loadExcelTemplate() {
    if (!excelArrayBuffer) {
        const path = SlabHeatingPlannerExcelConstants.path;
        const response = await fetch(path);
        if (!response.ok) throw new Error("Failed to fetch Excel template from path " + path);
        excelArrayBuffer = await response.arrayBuffer();
    }

    // @ts-ignore
    const excel = new ExcelJS.Workbook();
    await excel.xlsx.load(excelArrayBuffer);
    return new WorkbookWrapper(excel);
}

/**
 * Kitölti a födémfűtők adatait.
 * 
 * @param {WorkbookWrapper} workbook 
 * @returns {undefined}
 */
function fillOutSlabHeaterData(workbook) {
    workbook.selectSheetByName(SlabHeatingPlannerExcelConstants.summarySheetName);
    const slabHeaterGroups = SlabHeaterGroupService.findAll();

    let nextRow = 4;
    for (let shg of slabHeaterGroups) {
        const slabHeaters = SlabHeaterService.findByIdList(shg.slabHeaterIds);
        for (let sh of slabHeaters) {
            workbook.addRow(nextRow);
            workbook.addValuesToRow(nextRow, [
                sh.rowNumber,
                shg.width,
                shg.length,
                sh.pipeLength || 0,
                sh.pipeLength || 0,
                `=D${nextRow}+E${nextRow}`,
                '',
                `=B${nextRow}*C${nextRow}`
            ]);
            workbook.colorRow(nextRow, 8, sh.outlineColor);
            nextRow++;
        }
    }
    workbook.deleteRow(nextRow);
}

export const SlabHeatingPlannerExcelGenerator = {
    generateExcel
};