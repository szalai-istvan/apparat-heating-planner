import { SelectionAction } from "../../common/actions/selection/SelectionAction.js";
import { CustomEventTypes } from "../../common/event/CustomEventTypes.js";
import { Events } from "../../common/event/Events.js";
import { Load } from "../../common/io/load.js";
import { Save } from "../../common/io/save.js";
import { HeatingPlannerSelectionAction } from "../actions/selection/HeatingPlannerSelectionAction.js";
import { LoadHeatingPlanner } from "../io/loadHeatingPlanner.js";
import { SaveHeatingPlanner } from "../io/SaveHeatingPlanner.js";
import { ElementStoreHeatingPlanner } from "../store/ElementStoreHeatingPlanner.js";
import { UiLayoutHeatingPlanner } from "../ui/createButtonsHeatingPlanner.js";

/**
 * Projekt specifikus setup műveletek
 * 
 * @returns {undefined}
 */
function setupHeatingPlanner() {
    // customize components
    UiLayoutHeatingPlanner.createButtonsHeatingPlanner();
    ElementStoreHeatingPlanner.customizeElementStoreHeatingPlanner();

    // load-save config
    Load.registerProjectSpecificLoadingStep(LoadHeatingPlanner.loadPanels);
    Load.registerProjectSpecificLoadingStep(LoadHeatingPlanner.loadStructureElements);
    Save.registerProjectSpecificSavingStep(SaveHeatingPlanner.addHeatingPlannerObjectsToProjectState);

    // selection config
    SelectionAction.setSelectableObjectSearchStep([
        SelectionAction.searchForSelectableRoom,
        HeatingPlannerSelectionAction.searchForSelectablePanelGroup,
        SelectionAction.searchForSelectableBlueprint
    ]);
    SelectionAction.setProjectSpecificClearSelectionCacheFunction(clearSelectionCacheHeatingPlanner);
    SelectionAction.setProjectSpecificDeselectFunction(deselectObjectHeatingPlanner);
    SelectionAction.setProjectSpecificSelectObjectFunction(selectObjectHeatingPlanner);

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

Events.registerEventListener(CustomEventTypes.setup, setupHeatingPlanner);