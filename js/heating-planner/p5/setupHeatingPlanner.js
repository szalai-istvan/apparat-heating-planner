/**
 * Projekt specifikus setup műveletek
 * 
 * @returns {undefined}
 */
function setupHeatingPlanner() {
    // customize components
    createButtonsHeatingPlanner();
    customizeElementStoreHeatingPlanner();

    // load-save config
    registerProjectSpecificLoadingStep(loadPanels);
    registerProjectSpecificSavingStep(addHeatingPlannerObjectsToProjectState);

    // removal config
    registerEventListener(SELECTED_ROOM_REMOVED, onSelectedRoomRemovedHeatingPlanner);

    // selection config
    setSelectableObjectSearchStep([
        searchForSelectableRoom,
        searchForSelectablePanelGroup,
        searchForSelectableBlueprint
    ]);
    setProjectSpecificClearSelectionCacheFunction(clearSelectionCacheHeatingPlanner);
    setProjectSpecificDeselectFunction(deselectObjectHeatingPlanner);

}

setupHeatingPlanner();