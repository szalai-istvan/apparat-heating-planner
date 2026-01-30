import { ApplicationState } from "../appdata/ApplicationState.js";
import { ScreenActions } from "../screen/ScreenActions.js";
import { MouseCursor } from "../ui/MouseCursor.js";

/**
 * Egérgörgettekeréskor lefutó függvény.
 * 
 * @param {object} event 
 * @returns {undefined}
 */
window.mouseWheel = function(event) {
    if (!ApplicationState.controlsAreEnabled || MouseCursor.mouseCursorIsInsideUi()) {
        return;
    }
    
    if (event.delta > 0) {
        ScreenActions.zoomOut();
    } else {
        ScreenActions.zoomIn();
    }
}