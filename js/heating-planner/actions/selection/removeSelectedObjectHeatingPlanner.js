/**
 * Törli a kijelölt objektumot.
 * 
 * @param {string} className
 * @returns {undefined}
 */
function removeSelectedObjectHeatingPlanner(className) {
    if (className === CLASS_PANEL_GROUP) {
        removeSelectedPanelGroup();
    }
}