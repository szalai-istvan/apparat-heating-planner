import { RenderBlueprint } from "../actions/blueprint/RenderBlueprint.js";
import { RenderRoom } from "../actions/room/RenderRoom.js";
import { ScalingActions } from "../actions/scaling/ScalingActions.js";
import { ApplicationState } from "../appdata/ApplicationState.js";
import { DebugTools } from "../debug/Debug.js";
import { ScreenActions } from "../screen/ScreenActions.js";
import { BlueprintService } from "../service/BlueprintService.js";
import { RoomService } from "../service/RoomService.js";

let projectSpecificRenderTranslatedObjects = () => {};
let projectSpecificDebugOnlyRenderTranslatedObjects = () => {};

/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjects() {
    push();
    ScreenActions.translateScreen();

    BlueprintService.findAll().forEach(bp => RenderBlueprint.renderBlueprint(bp));
    RoomService.findAll().forEach(room => RenderRoom.renderRoom(room));
    
    projectSpecificRenderTranslatedObjects();

    RoomService.findAll().forEach(room => RenderRoom.renderRoomName(room));

    ScalingActions.renderScaler();

    if (ApplicationState.debugEnabled) {
        projectSpecificDebugOnlyRenderTranslatedObjects();
        DebugTools.drawAxis();
    }

    pop();
}

/**
 * Beállítja a projekt specifikus renderelési függvényt.
 * 
 * @param {Function} func 
 */
function setProjectSpecificRenderTranslatedObjects(func) {
    projectSpecificRenderTranslatedObjects = func;
}


/**
 * Beállítja a projekt specifikus debug-only renderelési függvényt.
 * 
 * @param {Function} func 
 */
function setProjectSpecificDebugOnlyRenderTranslatedObjects(func) {
    projectSpecificDebugOnlyRenderTranslatedObjects = func;
}

/**
 * A draggel korrigált pozíciójú objektumok rendereléséért felelős függvények gyüjteménye.
 */
export const TranslatedObjectRenderer = {
    renderTranslatedObjects,
    setProjectSpecificRenderTranslatedObjects,
    setProjectSpecificDebugOnlyRenderTranslatedObjects
};