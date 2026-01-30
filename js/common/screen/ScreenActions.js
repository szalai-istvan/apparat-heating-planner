import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { CreatePoint } from "../geometry/Point/CreatePoint.js";
import { Point } from "../geometry/Point/Point.js";
import { DocumentData } from "../ui/DocumentData.js";
import { MouseCursor } from "../ui/MouseCursor.js";

/** @type {Point} */
let screenDragStartPosition;

/**
 * Elindítja a képernyő mozgatását.
 * 
 * @returns {undefined}
 */
function startDragging() {
    screenDragStartPosition = MouseCursor.getMousePosition();
    ApplicationState.screenDraggingInProgress = true;
}

/**
 * Leállítja a képernyő mozgatását.
 * 
 * @returns {undefined}
 */
function stopDragging() {
    if (ApplicationState.screenDraggingInProgress) {
        const currentDragValue = getCurrentDragValue();
        ApplicationState.screenSumDrag.x += (currentDragValue.x / ApplicationState.screenZoom);
        ApplicationState.screenSumDrag.y += (currentDragValue.y / ApplicationState.screenZoom);
    }
    
    ApplicationState.screenDraggingInProgress = false;
}

/**
 * Képernyő felfelé zoomolás.
 * 
 * @returns {undefined}
 */
function zoomIn() {
    ApplicationState.screenZoom = Math.min(
        Constants.screen.maximumZoom, 
        ApplicationState.screenZoom * Constants.screen.zoomStep);
}

/**
 * Képernyő lefelé zoomolás.
 * 
 * @returns {undefined}
 */
function zoomOut() {
    ApplicationState.screenZoom = Math.max(
        Constants.screen.minimumZoom, 
        ApplicationState.screenZoom / Constants.screen.zoomStep);
}

/**
 * Visszaajda a pillanatnyilag folyamatban lévő képernyő húzás értékét
 * 
 * @returns {Point} pillanatnyi húzás értéke
 */
function getCurrentDragValue() {
    if (ApplicationState.screenDraggingInProgress) {
        const startPosition = screenDragStartPosition;
        return CreatePoint.createPoint((mouseX - startPosition.x) || 0, (mouseY - startPosition.y) || 0);
    }
    return CreatePoint.createPoint(0, 0);
}

/**
 * Elvégzi a dragging értékek szerinti transzlációt a renderelés előkészítéséhez
 * 
 * @returns {undefined}
 */
function translateScreen() {
    const canvasSize = DocumentData.getCanvasSize();
    const sumDrag = ApplicationState.screenSumDrag;

    translate(0.5 * canvasSize.x, 0.5 * canvasSize.y);
    scale(ApplicationState.screenZoom);
    translate(sumDrag.x, sumDrag.y);

    if (ApplicationState.screenDraggingInProgress) {
        const currentDragValue = getCurrentDragValue();
        translate(
            currentDragValue.x / ApplicationState.screenZoom,
            currentDragValue.y / ApplicationState.screenZoom
        );
    }
}

/**
 * Képernyő állapotát kezelő függvények.
 */
export const ScreenActions = {
    startDragging,
    stopDragging,
    zoomIn,
    zoomOut,
    getCurrentDragValue,
    translateScreen
};