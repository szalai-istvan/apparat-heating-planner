import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { MathTools } from "../math/MathTools.js";
import { MouseCursor } from "../ui/MouseCursor.js";

/**
 * Törli a böngésző local storage-jában tárolt projekt állapotot, és újratölti az oldalt.
 * 
 * @returns {undefined}
 */
window.evictLocalStorageAndReload = function() {
    localStorage.removeItem(Constants.debug.localStorageDataKey);
    location.reload();
}

/**
 * Átbillenti a debug funkciók bekapcsoltságát
 * 
 * @returns {boolean}, a debugEnabled flag új értéke
 */
window.toggleDisplayDebugInfo = function() {
    ApplicationState.debugEnabled = !ApplicationState.debugEnabled;
    return ApplicationState.debugEnabled;
}

/**
 * Felrajzolja a képernyőre az x, és y koordinátatengelyeket.
 * 
 * @returns {undefined}
 */
function drawAxis() {
    if (!ApplicationState.debugEnabled) {
        return;
    }

    push();

    textSize(12);
    for (let i = -10_000; i < 10_000; i += 50) {
        strokeWeight(1);
        stroke(Constants.strings.black);
        line(i, -5, i, 5);
        line(-5, i, 5, i);
        if (i !== 0) {
            noStroke();
            fill(Constants.strings.black);
            textAlign(CENTER, CENTER);
            text(i, i, 15);
            textAlign(LEFT, CENTER);
            text(i, 15, i);
        }
    }

    stroke(1);
    stroke(Constants.strings.black);
    line(0, 10_000, 0, -10_000);
    line(-10_000, 0, 10_000, 0);

    pop();

}

/**
 * Felrajzolja a kurzor mellé a debug infókat: A kurzor koordinátáit, a zoom értéket és a framerate-t.
 * 
 * @returns {undefined}
 */
function drawCursorDebugInfo() {
    if (!ApplicationState.debugEnabled) {
        return;
    }

    push();

    const mouse = MouseCursor.getMousePositionAbsolute();
    textAlign(LEFT, TOP);
    textSize(12);
    text(`x: ${MathTools.roundNumber(mouse.x, 1)}\ny: ${MathTools.roundNumber(mouse.y, 1)}\nzoom: ${MathTools.roundNumber(ApplicationState.screenZoom, 1)}\nfps: ${MathTools.roundNumber(frameRate(), 1)}`, mouseX + 20, mouseY + 20);

    pop();
}

/**
 * Debug eszközök gyüjteménye
 */
export const DebugTools = {
    drawAxis,
    drawCursorDebugInfo
};