import { SelectionAPI } from "../api/SelectionAPI.js";
import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { CustomEventTypes } from "../event/customEventTypes.js";
import { Events } from "../event/Events.js";
import { PointCalculations } from "../geometry/Point/PointCalculations.js";
import { ScreenActions } from "../screen/ScreenActions.js";
import { MouseCursor } from "../ui/MouseCursor.js";

/**
 * Egér elengedésekor lefutó függvény.
 * 
 * @returns {undefined}
 */
window.mouseReleased = function () {
    if (!ApplicationState.controlsAreEnabled || MouseCursor.mouseCursorIsInsideUi()) {
        return;
    }

    if (mouseButton === LEFT) {
        leftMouseButtonReleasedFunc();
    } else if (mouseButton === RIGHT) {
        rightMouseButtonReleasedFunc();
    }

    ScreenActions.stopDragging();
}

/**
 * Bal egérgomb elengedésekor lefutó függvény.
 * 
 * @returns {undefined}
 */
function leftMouseButtonReleasedFunc() {
    if (PointCalculations.calculateDistanceFromOrigin(ScreenActions.getCurrentDragValue()) < Constants.ui.selectDragThreshold) {
        SelectionAPI.searchSelectableObject();
    }
}

/**
 * Jobb egérgomb elengedésekor lefutó függvény.
 * 
 * @returns {undefined}
 */
function rightMouseButtonReleasedFunc() {
    Events.dispatchCustomEvent(CustomEventTypes.rightMouseButtonReleased, {});
}