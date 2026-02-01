import { SelectionAPI } from "../api/SelectionAPI.js";
import { Constants } from "../appdata/Constants.js";
import { AbsoluteObjectRenderer } from "../render/AbsoluteObjectRenderer.js";
import { TranslatedObjectRenderer } from "../render/TranslatedObjectRenderer.js";
import { MouseCursor } from "../ui/MouseCursor.js";

/** {boolean} flag, hogy a renderelés be van-e kapcsolva. */
let renderingEnabled = false;

window.draw = function() {
    if (!renderingEnabled) {
        return;
    }

    SelectionAPI.clearSelectionCache();
    MouseCursor.setCursorType();

    background(Constants.ui.backgroundColor);

    TranslatedObjectRenderer.renderTranslatedObjects();
    AbsoluteObjectRenderer.renderAbsolutePositionObjects();
}

/**
 * Kikapcsolja a renderelést.
 * 
 * @returns {undefined}
 */
function disableRendering() {
    renderingEnabled = false;
}

/**
 * Bekapcsolja a renderelést.
 * 
 * @returns {undefined}
 */
function enableRendering() {
    renderingEnabled = true;
}

/**
 * A Draw modul, amely a renderelés vezérléséért felelős.
 */
export const Draw = {
    enableRendering,
    disableRendering
};