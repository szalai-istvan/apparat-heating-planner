import { BlueprintCalculations } from "../actions/blueprint/BlueprintCalculations.js";
import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/constants.js";
import { RectangleCalculations } from "../geometry/Rectangle/RectangleCalculations.js";
import { DocumentData } from "../ui/DocumentData.js";

/**
 * Excel munkafüzetet reprezentáló wrapper osztály.
 */
export class WorkbookWrapper {
    /** ExcelJS munkafüzet */
    workbook;
    /** Kiválasztott lap */
    selectedSheet;

    constructor(workbook) {
        this.workbook = workbook;
    }

    /**
     * Kiválasztja az adott nevű munkalapot
     * 
     * @param {string} name 
     * @returns {undefined}
     */
    selectSheetByName(name) {
        const sheet = this.workbook.getWorksheet(name);
        if (!sheet) {
            throw new Error(`Sheet named '${name}' not found!`);
        }

        this.selectedSheet = sheet;
    }

    /**
     * Hozzáad egy sort a megadott indexnél a kiválasztott laphoz.
     * 
     * @param {number} rowNumber 
     * @returns {undefined}
     */
    addRow(rowNumber) {
        if (!this.selectedSheet) {
            throw new Error('No sheet selected!');
        }

        this.selectedSheet.insertRow(rowNumber);

        const insertedRow = this.selectedSheet.getRow(rowNumber);
        const originalRow = this.selectedSheet.getRow(rowNumber + 1);

        originalRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const targetCell = insertedRow.getCell(colNumber);
            targetCell.style = JSON.parse(JSON.stringify(cell.style));
        });
    }

    /**
     * A megadott indexű sort beszínezi
     * 
     * @param {number} rowNumber 
     * @param {number} upToColumn 
     * @param {string} color 
     * @returns {undefined}
     */
    colorRow(rowNumber, upToColumn, color) {
        if (!this.selectedSheet) {
            throw new Error('No sheet selected!');
        }

        const row = this.selectedSheet.getRow(rowNumber);
        let column = 1;
        while (column <= upToColumn) {
            const cell = row.getCell(column);
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: color.replace('#', '88') }
            };

            column++;
        }
    }

    /**
     * Letörli a kiválasztott lapról a megadott számú sort.
     * 
     * @param {number} rowNumber 
     * @returns {undefined}
     */
    deleteRow(rowNumber) {
        if (!this.selectedSheet) {
            throw new Error('No sheet selected!');
        }

        this.selectedSheet.spliceRows(rowNumber, 1);
    }

    /**
     * A megadott sorba a megadott adatokat veszi fel.
     * 
     * @param {number} rowNumber 
     * @param {Array<string|number>} values 
     * @returns {undefined}
     */
    addValuesToRow(rowNumber, values) {
        if (!this.selectedSheet) {
            throw new Error('No sheet selected!');
        }
        const row = this.selectedSheet.getRow(rowNumber);

        let column = 1;
        for (let value of values) {
            if (value && value.toString().startsWith('=')) {
                row.getCell(column).value = { formula: value };
            } else {
                row.getCell(column).value = value || '';
            }
            column++;
        }
    }

    /**
     * Beállítja a megadott cella értékét.
     * 
     * @param {number} rowNumber 
     * @param {number} column 
     * @param {number | string} value 
     * @returns {undefined}
     */
    setCellValue(rowNumber, column, value) {
        if (!this.selectedSheet) {
            throw new Error('No sheet selected!');
        }

        const row = this.selectedSheet.getRow(rowNumber);
        if (value && value.toString().startsWith('=')) {
            row.getCell(column).value = { formula: value };
        } else {
            row.getCell(column).value = value || '';
        }
    }

    /**
     * Hozzáadja a tervrajz pillanatnyi állapotát az Excel táblázathoz
     * 
     * @returns {undefined}
     */
    exportBlueprint() {
        if (!this.selectedSheet) {
            throw new Error('No sheet selected!');
        }

        const blueprintSheet = this.selectedSheet;
        const screenSumDrag = ApplicationState.screenSumDrag;
        let screenZoom = ApplicationState.screenZoom;
        const beforeScreenData = { x: screenSumDrag.x, y: screenSumDrag.y, zoom: screenZoom };
        const canvasOriginalSize = DocumentData.getCanvasSize();

        try {
            ApplicationState.screenZoom = 4;
            screenZoom = ApplicationState.screenZoom;

            const leftRibbonWidth = Constants.ui.leftRibbonWidth;
            const topRibbonHeight = Constants.ui.topRibbonHeight;
            const contentBoundingBox = BlueprintCalculations.getDrawingBoundingBox();

            ApplicationState.screenSumDrag = contentBoundingBox.middlePoint;
            const contentWidth = screenZoom * (RectangleCalculations.getProjectedSizeX(contentBoundingBox) + leftRibbonWidth);
            const contentHeight = screenZoom * (RectangleCalculations.getProjectedSizeY(contentBoundingBox) + topRibbonHeight);

            // @ts-ignore
            resizeCanvas(contentWidth + leftRibbonWidth * 2, contentHeight + topRibbonHeight * 2);
            // @ts-ignore
            draw();

            // @ts-ignore
            let buffer = createGraphics(contentWidth, contentHeight);
            // @ts-ignore
            const extracted = get(leftRibbonWidth, topRibbonHeight, contentWidth, contentHeight);
            buffer.image(extracted, 0, 0);
            const base64Image = buffer.elt.toDataURL("image/png");

            const imageId = this.workbook.addImage({
                buffer: base64ToArrayBuffer(base64Image.split(',')[1]),
                extension: "png"
            });

            blueprintSheet.addImage(imageId, {
                tl: { col: 0, row: 0 },
                ext: { width: contentWidth, height: contentHeight }
            });

        } finally {
            ApplicationState.screenSumDrag = { x: beforeScreenData.x, y: beforeScreenData.y };
            ApplicationState.screenZoom = beforeScreenData.zoom;
            // @ts-ignore
            resizeCanvas(canvasOriginalSize.x, canvasOriginalSize.y);
        }
    }

    download() {
        const workbook = this.workbook;

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            const date = new Date();
            const filenameSuffix = `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}_${Math.random().toString().substring(2, 7)}`;
            link.download = `apparat_excel_${filenameSuffix}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}