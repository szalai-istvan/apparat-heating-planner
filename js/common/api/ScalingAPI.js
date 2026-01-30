import { ScalingActions } from "../actions/scaling/ScalingActions.js";
import { UserActionHandler } from "./userActionHandler/UserActionHandler.js";


/**
 * Elindítja a méretarányozás folyamatát.   
 * 
 * @returns {undefined}
 */
function startScaling() {
    UserActionHandler.handleUserActionNoParam(ScalingActions.startScaling);
}

/**
 * Rögzít egy méretarányozó pontot.
 * 
 * @returns {undefined}
 */
function recordScalingPoint() {
    UserActionHandler.handleUserActionNoParam(ScalingActions.proceedWithScaling);
}

/**
 * Méretarányozással kapcsolatos user interakciók
 */
export const ScalingAPI = {
    startScaling,
    recordScalingPoint
};