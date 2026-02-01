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
    removeSelectedObject
};