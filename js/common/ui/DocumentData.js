import { ApplicationState } from "../appdata/ApplicationState.js";
import { CreatePoint } from "../geometry/Point/CreatePoint.js";
import { Point } from "../geometry/Point/Point.js";

/**
 * Visszaadja a dokumntum befoglaló méreteit
 * 
 * @returns {Point}, a dokumentum méretei
 */
function getDocumentSize() {
    return CreatePoint.createPoint(
        Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    );
}

/**
 * Visszaadja a canvas méretét
 * 
 * @returns {Point} a canvas mérete
 */
function getCanvasSize() {
    const canvas = ApplicationState.canvas;
    if (!canvas) {
        return CreatePoint.createPoint(0, 0);
    }

    return CreatePoint.createPoint(canvas.width, canvas.height);
}

/**
 * Dokumentummal kapcsolatos függvények gyűjteménye.
 */
export const DocumentData = {
    getDocumentSize,
    getCanvasSize
};