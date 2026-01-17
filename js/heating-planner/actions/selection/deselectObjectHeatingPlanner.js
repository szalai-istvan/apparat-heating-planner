/**
 * Megszűnteti a kijelölt objektum kiválasztását és visszaküldi, hogy sikerült-e
 * 
 * @param {string} className a kijelölt objektum osztályának neve.
 * @returns {boolean} a művelet sikeressége
 */
function deselectObjectHeatingPlanner(className) {
    let successfulDeselect;
    if (className === CLASS_PANEL_GROUP) {
        successfulDeselect = deselectPanelGroup();
    }

    return successfulDeselect;
}
