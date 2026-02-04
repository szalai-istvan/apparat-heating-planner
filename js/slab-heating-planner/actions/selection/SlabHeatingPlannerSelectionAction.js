/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObjectSlabHeatingPlanner(obj) {
    const className = getClassName(obj);
    
    if (className === CLASS_SLAB_HEATER_GROUP) {
        if (selectSlabHeaterGroup(obj)) {
            selectedObject = obj;
        }
    } else if (className === CLASS_BOX_GROUP) {
        if (selectBoxGroup(obj)) {
            selectedObject = obj;
        }
    } else {
        throw new Error(`Unexpected class of selected object: ${className}`);
    }
}

/**
 * Megszűnteti a kijelölt objektum kiválasztását és visszaküldi, hogy sikerült-e
 * 
 * @param {string} className a kijelölt objektum osztályának neve.
 * @returns {boolean} a művelet sikeressége
 */
function deselectObjectSlabHeatingPlanner(className) {
    let successfulDeselect;
    if (className === CLASS_SLAB_HEATER_GROUP) {
        successfulDeselect = deselectSlabHeaterGroup();
    } else if (className === CLASS_BOX_GROUP) {
        successfulDeselect = deselectBoxGroup();
    } else if (className === CLASS_PIPE_DRIVER) {
        successfulDeselect = deselectPipeDriver();
    }

    return successfulDeselect;
}

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

/**
 * Törli az összes kijelölhető objektum kijelölő cache értékét
 * 
 * @returns {undefined}
 */
function clearSelectionCacheSlabHeatingPlanner() {
    cachedSelectableSlabHeaterGroup = null;
    cachedSelectableBoxGroup = null;
    cachedSelectablePipeDriver = null;

    elementStore.rooms.forEach(r => r.cursorIsInsideCache = null);
    elementStore.slabHeaterGroups.forEach(shg => clearSlabHeaterGroupSelectionCache(shg));
    elementStore.boxGroups.forEach(bg => clearBoxGroupSelectionCache(bg));
    elementStore.pipeDrivers.forEach(pd => clearPipeDriverSelectionCache(pd));
}