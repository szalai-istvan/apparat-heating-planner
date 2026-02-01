import { SelectRoomAction } from "../actions/room/SelectRoomAction.js";
import { SelectionAction } from "../actions/selection/SelectionAction.js";
import { UserActionHandler } from "./userActionHandler/UserActionHandler.js";

/**
 * Kiválasztható objektum megkeresése
 * 
 * @returns {undefined}
 */
function searchSelectableObject() {
    UserActionHandler.handleUserActionNoParam(SelectionAction.searchSelectableObject);
}

/**
 * Kiválasztható objektum megkeresése
 * 
 * @returns {undefined}
 */
function deselectObject() {
    UserActionHandler.handleUserActionNoParam(SelectionAction.deselectObject);
}

/**
 * Kiüríti a cachelt kiválasztható objektum értéket.
 * 
 * @returns {undefined}
 */
function clearSelectionCache() {
    UserActionHandler.handleUserActionNoParam(SelectionAction.clearSelectionCache);
}

/**
 * Kiválasztott objektum elforgatása
 * 
 * @param {number} direction 
 */
function rotateSelectedObject(direction) {
    UserActionHandler.handleUserActionParam1(SelectionAction.rotateSelectedObject, direction);
}
/**
 * Törli a kiválasztott objektumot.
 * 
 * @returns {undefined}
 */
function removeSelectedObject() {
    UserActionHandler.handleUserActionNoParam(SelectionAction.removeSelectedObject);
}

/**
 * Objektum választással kapcsolatos felhasználói műveletek.
 */
export const SelectionAPI = {
    searchSelectableObject,
    deselectObject,
    clearSelectionCache,
    rotateSelectedObject,
    removeSelectedObject
};