import { UserActionHandler } from "../../common/api/userActionHandler/UserActionHandler.js";
import { SlabHeatingPlannerSelectionAction } from "../actions/selection/SlabHeatingPlannerSelectionAction.js";

/**
 * Hozzáad a kiválasztott csoporthoz egy új elemet
 * 
 * @returns {undefined}
 */
function addToSelectedGroup() {
    UserActionHandler.handleUserActionNoParam(SlabHeatingPlannerSelectionAction.addToSelectedGroup);
}

/**
 * Elveszi a kiválasztott csoportból az utolsó elemet
 * 
 * @returns {undefined}
 */
function removeLastFromSelectedGroup() {
    UserActionHandler.handleUserActionNoParam(SlabHeatingPlannerSelectionAction.removeLastFromSelectedGroup);
}

/**
 * Csoportkezelés műveletei
 */
export const GroupManagementAPI = {
    addToSelectedGroup,
    removeLastFromSelectedGroup
};