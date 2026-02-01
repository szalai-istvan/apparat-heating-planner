import { UserActionHandler } from "../../common/api/userActionHandler/UserActionHandler.js";
import { ElementStore } from "../../common/store/ElementStore.js";
import { CreatePanelGroupAction } from "../actions/panelGroup/CreatePanelGroupAction.js";
import { UpdatePanelGroupAction } from "../actions/panelGroup/UpdatePanelGroupAction.js";
import { HeatingPlannerApplicationState } from "../appdata/HeatingPlannerApplicationState.js";

/**
 * Új panelcsoport létrehozása. Amennyiben van kiválasztott panelcsoport, úgy a meglévő típusát váltja le.
 * 
 * @param {string} type panel típusa
 * @returns {undefined}
 */
function createOrReplacePanelGroup(type) {
    UserActionHandler.handleUserActionParam1(CreatePanelGroupAction.createOrReplacePanelGroup, type);
}

/**
 * Panel hozzáadása a kiválasztott csoporthoz.
 * 
 * @returns {undefined}
 */
function addPanelToSelectedGroup() {
    UserActionHandler.handleUserActionNoParam(UpdatePanelGroupAction.addPanelToSelectedGroup)
}

/**
 * Panel eltávolítása a kiválasztott csoportból.
 * 
 * @returns {undefined}
 */
function removePanelFromSelectedGroup() {
    UserActionHandler.handleUserActionNoParam(UpdatePanelGroupAction.removePanelFromSelectedGroup);
}

/**
 * Fűtőelem csoportokkal kapcsolatos műveletek.
 */
export const PanelGroupAPI = {
    createOrReplacePanelGroup,
    addPanelToSelectedGroup,
    removePanelFromSelectedGroup
};