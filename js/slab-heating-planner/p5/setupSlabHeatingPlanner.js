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
    setProjectSpecificSelectObjectFunction(selectObjectSlabHeatingPlanner);

    // rendering config
    setprojectSpecificRenderTranslatedObjects(renderTranslatedObjectsSlabHeatingPlanner);
    setprojectSpecificDebugOnlyRenderTranslatedObjects(renderDebugOnlyTranslatedObjectsSlabHeatingPlanner);

    // other listeners
    registerEventListener(ROOMS_CLEARED, onRoomsClearedSlabHeatingPlanner);
    registerEventListener(SELECTED_ROOM_REMOVED, event => onSelectedRoomRemovedSlabHeatingPlanner(event.detail.room));
    registerEventListener(ROTATE_SELECTED_OBJECT, event => rotateSelectedObjectSlabHeatingPlanner(event.detail.direction));
    registerEventListener(REMOVE_SELECTED_OBJECT, event => removeSelectedObjectSlabHeatingPlanner(event.detail.className));

    if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
        loadProject();
    }

    enableRendering();
}

registerEventListener(SETUP, setupSlabHeatingPlanner);