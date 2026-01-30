import { RectangleCalculations } from "../../geometry/Rectangle/RectangleCalculations.js";
import { MouseCursor } from "../../ui/MouseCursor.js";

/**
 * Egységes függvény a kiválasztható objektum megkeresésére.
 * 
 * @param {any} obj
 * @returns {boolean}
 */
function evaluateSelectionCriteria(obj) {
    if (!obj || !obj.selectionBox) {
        return false;
    }

    return RectangleCalculations.pointIsInsideRectangle(MouseCursor.getMousePositionAbsolute(), obj.selectionBox);
}

/**
 * Közös szelekció kritérium műveletek
 */
export const SelectionCriteria = {
    evaluateSelectionCriteria
};