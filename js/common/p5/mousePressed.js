import { SelectionAction } from "../actions/selection/SelectionAction.js";
import { RoomAPI } from "../api/RoomAPI.js";
import { ScalingAPI } from "../api/ScalingAPI.js";
import { ApplicationState } from "../appdata/ApplicationState.js";
import { ScreenActions } from "../screen/ScreenActions.js";
import { MouseCursor } from "../ui/MouseCursor.js";

/**
 * Egérgomb megnyomásakor lefutó függvény.
 * 
 * @returns {undefined}
 */
window.mousePressed = function() {
    if (!ApplicationState.controlsAreEnabled || MouseCursor.mouseCursorIsInsideUi()) {
        return;
    }

    if (mouseButton === LEFT) {
        leftMouseButtonPressedFunc();
    } else if (mouseButton === RIGHT) {
        rightMouseButtonPressedFunc();
    }
}

/**
 * Jobb egérgomb megnyomásakor lefutó függvény.
 * 
 * @returns {undefined}
 */
function rightMouseButtonPressedFunc() {
    ScalingAPI.recordScalingPoint();
    RoomAPI.addPointToSelectedRoom();

    SelectionAction.deselectObject();
}

/**
 * Bal egérgomb megnyomásakor lefutó függvény.
 * 
 * @returns {undefined}
 */
function leftMouseButtonPressedFunc() {
    ScreenActions.startDragging();
}