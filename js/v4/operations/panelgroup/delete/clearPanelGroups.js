/**
 * Törli az összes panelcsoportot.
 * 
 * @returns {undefined}
 */
function clearPanelGroups() {
    elementStore.panelGroups = [];
    elementStore.panelGroupsById = {};
    elementStore.panels = [];
    elementStore.panelsById = {};
    
    selectedPanelGroup = null;
    selectedObject = null;
}