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
    registerProjectSpecificLoadingStep(loadStructureElements);
    registerProjectSpecificSavingStep(addHeatingPlannerObjectsToProjectState);

    // selection config
    setSelectableObjectSearchStep([
        searchForSelectableRoom,
        searchForSelectablePanelGroup,
        searchForSelectableBlueprint
    ]);
    setProjectSpecificClearSelectionCacheFunction(clearSelectionCacheHeatingPlanner);
    setProjectSpecificDeselectFunction(deselectObjectHeatingPlanner);
    setProjectSpecificSelectObjectFunction(selectObjectHeatingPlanner);

    // rendering config
    setprojectSpecificRenderTranslatedObjects(renderTranslatedObjectsHeatingPlanner);
    setprojectSpecificDebugOnlyRenderTranslatedObjects(renderDebugOnlyTranslatedObjectsHeatingPlanner);

    // other listeners
    registerEventListener(ROOMS_CLEARED, onRoomsClearedHeatingPlanner);
    registerEventListener(ROTATE_SELECTED_OBJECT, rotateSelectedPanelGroup);
    registerEventListener(SELECTED_ROOM_REMOVED, event => onSelectedRoomRemovedHeatingPlanner(event.detail.room));
    registerEventListener(REMOVE_SELECTED_OBJECT, event => removeSelectedObjectHeatingPlanner(event.detail.className));
    registerEventListener(UPDATE_RENDER_SIZE_VALUE, updateRenderSizeValuesHeatingPlanner);

    if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
        loadProject();        
    }

    enableRendering();
}


registerEventListener(SETUP, setupHeatingPlanner);