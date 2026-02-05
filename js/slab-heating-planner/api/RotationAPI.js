import { UserActionHandler } from "../../common/api/userActionHandler/UserActionHandler.js";
import { SlabHeatingPlannerSelectionAction } from "../actions/selection/SlabHeatingPlannerSelectionAction.js";

/**
 * Elforgatja a kiválasztott objektumot.
 * 
 * @param {number} direction
 * @returns {undefined}
 */
function rotateSelectedObject(direction) {
    UserActionHandler.handleUserActionParam1(SlabHeatingPlannerSelectionAction.rotateSelectedObjectSlabHeatingPlanner, direction);
}

/**
 * Objektumok elforgatásának műveletei
 */
export const RotationAPI = {
    rotateSelectedObject
};