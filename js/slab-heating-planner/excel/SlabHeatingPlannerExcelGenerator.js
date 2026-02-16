import { ExcelGeneratorUtils } from "../../common/excel/excelGeneratorUtil.js";
import { WorkbookWrapper } from "../../common/excel/WorkbookWrapper.js";
import { HeatingPlannerExcelConstants } from "../../heating-planner/excel/ExcelConstants.js";
import { RenderPipeDriver } from "../actions/pipeDriver/RenderPipeDriver.js";
import { BoxService } from "../service/BoxService.js";
import { SlabHeaterGroupService } from "../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../service/SlabHeaterService.js";
import { SlabHeatingPlannerExcelConstants } from "./SlabHeatingPlannerExcelConstants.js";

/** @type {ArrayBuffer} */
let excelArrayBuffer = null;

/**
 * Legenerálja az összesítőt, árkalkulációt és a végleges tervrajzot tartalmazó Excel fájlt.
 * 
 * @param {number} km
 * @returns {Promise<undefined>}
 */
async function generateExcel(km) {
    km = Math.abs(km);
    const workbook = await loadExcelTemplate();

    fillOutSlabHeaterData(workbook);
    fillOutSummary(workbook, km);
    workbook.selectSheetByName(SlabHeatingPlannerExcelConstants.blueprintSheetName);
    try {
        RenderPipeDriver.disableMiddleLineRendering();
        workbook.exportBlueprint();
    } finally {
        RenderPipeDriver.enableMiddleLineRendering();
    }

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

/**
 * Rendelés összesítő kitöltése
 * 
 * @param {WorkbookWrapper} workbook
 * @param {number} km 
 * @returns {undefined}
 */
function fillOutSummary(workbook, km) {
    const L = SlabHeaterService.findAll().length;

    workbook.setCellValue(L + 6, 6, `=SUM(F4:F${L+3})`);
    workbook.setCellValue(L + 6, 8, `=SUM(H4:H${L+3})`);

    workbook.setCellValue(L + 7, 6, SlabHeatingPlannerExcelConstants.pipePricePerMeter);
    workbook.setCellValue(L + 7, 8, SlabHeatingPlannerExcelConstants.slabHeaterPricePerSquareMeter);

    workbook.setCellValue(L + 8, 6, `=F${L+6}*F${L+7}`);
    workbook.setCellValue(L + 8, 8, `=H${L+6} + H${L+7}`);

    workbook.setCellValue(L + 9, 8, 8800);
    workbook.setCellValue(L + 10, 8, `=F${L+8} + H${L+8}`);

    workbook.setCellValue(L + 11, 6, BoxService.findAll().length);
    workbook.setCellValue(L + 11, 7, SlabHeatingPlannerExcelConstants.boxPricePerPiece);
    workbook.setCellValue(L + 11, 8, `=F${L+11} * G${L+11}`);

    workbook.setCellValue(L + 12, 7, km > 0 ? km : 'Nem');
    workbook.setCellValue(L + 12, 8, km > 0 ? SlabHeatingPlannerExcelConstants.transportPrice.a * km + SlabHeatingPlannerExcelConstants.transportPrice.b : 0);

    workbook.setCellValue(L + 14, 8, `=SUM(H${L+9}:H${L+12})`);
}

export const SlabHeatingPlannerExcelGenerator = {
    generateExcel
};