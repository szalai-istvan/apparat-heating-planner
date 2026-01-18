/**
 * Törli a kijelölt objektumot.
 * 
 * @param {string} className
 * @returns {undefined}
 */
function removeSelectedObjectSlabHeatingPlanner(className) {
    if (className === CLASS_SLAB_HEATER_GROUP) {
        removeSelectedSlabHeaterGroup();
    } else if (className === CLASS_BOX_GROUP) {
        removeSelectedBoxGroup();
    } else if (className === CLASS_PIPE_DRIVER) {
        resetSelectedPipeDriver();
    }
}