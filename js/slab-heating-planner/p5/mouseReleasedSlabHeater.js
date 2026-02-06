import { UpdatePipeDriverAction } from "../actions/pipeDriver/UpdatePipeDriverAction.js";

/**
 * Jobb egérgomb elengedésekor futó függvény.
 */
function slabHeatingPlannerRightMouseButtonReleased() {
    UpdatePipeDriverAction.addProposedElementsToSelectedPipeDriver();
}

/**
 * Jobb egérgomb megnyomásával kapcsolatos projekt specifikus műveletek.
 */
export const SlabHeatingPlannerRightMouseButton = {
    slabHeatingPlannerRightMouseButtonReleased
};