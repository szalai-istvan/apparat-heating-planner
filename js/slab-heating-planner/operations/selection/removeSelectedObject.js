/**
 * Törli a kijelölt objektumot.
 * 
 * @returns {undefined}
 */
function removeSelectedObject() {
    const selected = selectedObject;
    if (!selected) {
        return;
    }
    const className = getClassName(selected);
    
    if (className === CLASS_ROOM) {
        removeSelectedRoom();
    } else if (className === CLASS_SLAB_HEATER_GROUP) {
        removeSelectedSlabHeaterGroup();
    } else if (className === CLASS_BOX_GROUP) {
        removeSelectedBoxGroup();
    } else if (className === CLASS_PIPE_DRIVER) {
        resetSelectedPipeDriver();
    }
}