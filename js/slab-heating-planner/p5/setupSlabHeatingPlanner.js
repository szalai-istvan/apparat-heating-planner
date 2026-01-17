/**
 * Projekt specifikus setup műveletek
 * 
 * @returns {undefined}
 */
function setupSlabHeatingPlanner() {
    // customize components
    createButtonsSlabHeatingPlanner();
    customizeElementStoreSlabHeatingPlanner();
    
    // load-save config
    registerProjectSpecificLoadingStep(loadSlabHeaters);
    registerProjectSpecificLoadingStep(loadBoxes);
    registerProjectSpecificLoadingStep(loadPipeDrivers);
    registerProjectSpecificSavingStep(addSlabHeatingPlannerObjectsToProjectState);

    // removal config
    registerEventListener(SELECTED_ROOM_REMOVED, onSelectedRoomRemovedSlabHeatingPlanner);

    // selection config
    setSelectableObjectSearchStep([
        searchForSelectableRoom,
        searchForSelectableSlabHeaterGroup,
        searchForSelectableBoxGroup,
        searchForSelectablePipeDriver,
        searchForSelectableBlueprint
    ]);
    setProjectSpecificClearSelectionCacheFunction(clearSelectionCacheSlabHeatingPlanner);
    setProjectSpecificDeselectFunction(deselectObjectSlabHeatingPlanner);
}

setupSlabHeatingPlanner();