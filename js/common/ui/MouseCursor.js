import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { CreatePoint } from "../geometry/Point/CreatePoint.js";
import { ScreenActions } from "../screen/ScreenActions.js";
import { DocumentData } from "./DocumentData.js";
import { UiCalculations } from "./UICalculations.js";

/**
 * Megállapítja, hogy a kurzor a UI paneleken belül található-e.
 * 
 * @returns {boolean}
 */
function mouseCursorIsInsideUi() {
    return mouseY < Constants.ui.topRibbonHeight || mouseX < Constants.ui.leftRibbonWidth;
}

/**
 * Beállítja a kurzor típusát.
 * 
 * @returns {undefined}
 */
function setCursorType() {
    if (mouseCursorIsInsideUi()) {
        cursor(ARROW);
    } else {
        cursor(CROSS);
    }
}

/**
 * Visszaadja a kurzor pozícióját a képernyőn
 * 
 * @returns {Point} a kurzor pozíciója
 */
function getMousePosition() {
    return { x: mouseX, y: mouseY };
}

/**
 * Visszaadja a kurzor abszolút pozícióját
 * 
 * @returns {Point} a kurzor pozíciója
 */
function getMousePositionAbsolute() {
    const screenZoom = ApplicationState.screenZoom;

    const currentDragValue = ScreenActions.getCurrentDragValue();
    const sumDrag = ApplicationState.screenSumDrag;
    const canvasSize = DocumentData.getCanvasSize();

    const x = (mouseX - currentDragValue.x - sumDrag.x * screenZoom - canvasSize.x / 2) / screenZoom;
    const y = (mouseY - currentDragValue.y - sumDrag.y * screenZoom - canvasSize.y / 2) / screenZoom;
    return CreatePoint.createPoint(x, y);
}

/**
 * Visszaadja a kurzor abszolút pozícióját, korrigálva hogyha a kurzor a UI alatt van.
 * 
 * @returns {Point} a kurzor pozíciója korrekcióval
 */
function getCorrectedMousePositionAbsolute() {
    const mousePosition = getMousePosition();
    const mousePositionAbsolute = getMousePositionAbsolute();

    const xCorrector = UiCalculations.calculateCorrector(Constants.ui.leftRibbonWidth + 10, mousePosition.x);
    const yCorrector = UiCalculations.calculateCorrector(Constants.ui.topRibbonHeight + 10, mousePosition.y);

    return CreatePoint.createPoint(mousePositionAbsolute.x + (xCorrector || 0), mousePositionAbsolute.y + (yCorrector || 0));
}

/**
 * Egér kurzor kezelésével kapcsolatos függvények gyüjteménye.
 */
export const MouseCursor = {
    setCursorType,
    mouseCursorIsInsideUi,
    getMousePosition,
    getMousePositionAbsolute,
    getCorrectedMousePositionAbsolute
};