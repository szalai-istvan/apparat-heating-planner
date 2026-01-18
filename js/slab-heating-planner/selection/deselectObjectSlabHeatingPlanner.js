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
