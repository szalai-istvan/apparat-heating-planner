import { SelectionAction } from "../../common/actions/selection/SelectionAction.js";
import { Events } from "../../common/event/Events.js";
import { Load } from "../../common/io/load.js";
import { Save } from "../../common/io/save.js";
import { Draw } from "../../common/p5/draw.js";
import { TranslatedObjectRenderer } from "../../common/render/TranslatedObjectRenderer.js";
import { LoadSlabHeatingPlanner } from "../io/LoadSlabHeatingPlanner.js";
import { SaveSlabHeatingPlanner } from "../io/SaveSlabHeatingPlanner.js";
import { ElementStoreSlabHeatingPlanner } from "../store/ElementStoreSlabHeatingPlanner.js";
import { UiLayoutSlabHeatingPlanner } from "../ui/UiLayoutSlabHeatingPlanner.js";

/**
 * Projekt specifikus setup műveletek
 * 
 * @returns {undefined}
 */
function setupSlabHeatingPlanner() {
    // customize components
    UiLayoutSlabHeatingPlanner.createButtonsSlabHeatingPlanner();
    ElementStoreSlabHeatingPlanner.customizeElementStoreSlabHeatingPlanner();

    // load-save config
    Load.registerProjectSpecificLoadingStep(LoadSlabHeatingPlanner.loadSlabHeaters);
    Load.registerProjectSpecificLoadingStep(LoadSlabHeatingPlanner.loadBoxes);
    Load.registerProjectSpecificLoadingStep(LoadSlabHeatingPlanner.loadPipeDrivers);
    Save.registerProjectSpecificSavingStep(SaveSlabHeatingPlanner.addSlabHeatingPlannerObjectsToProjectState);

    // selection config
    SelectionAction.setSelectableObjectSearchStep([
        SelectionAction.searchForSelectableRoom,
        // searchForSelectableSlabHeaterGroup,
        // searchForSelectableBoxGroup,
        // searchForSelectablePipeDriver, todo
        SelectionAction.searchForSelectableBlueprint
    ]);
    SelectionAction.setProjectSpecificClearSelectionCacheFunction(clearSelectionCacheSlabHeatingPlanner);
    SelectionAction.setProjectSpecificDeselectFunction(deselectObjectSlabHeatingPlanner);
    SelectionAction.setProjectSpecificSelectObjectFunction(selectObjectSlabHeatingPlanner);

    // rendering config
    TranslatedObjectRenderer.setProjectSpecificRenderTranslatedObjects(renderTranslatedObjectsSlabHeatingPlanner);
    TranslatedObjectRenderer.setProjectSpecificDebugOnlyRenderTranslatedObjects(renderDebugOnlyTranslatedObjectsSlabHeatingPlanner);

    // other listeners
    Events.registerEventListener(ROOMS_CLEARED, onRoomsClearedSlabHeatingPlanner);
    Events.registerEventListener(SELECTED_ROOM_REMOVED, event => onSelectedRoomRemovedSlabHeatingPlanner(event.detail.room));
    Events.registerEventListener(ROTATE_SELECTED_OBJECT, event => rotateSelectedObjectSlabHeatingPlanner(event.detail.direction));
    Events.registerEventListener(REMOVE_SELECTED_OBJECT, event => removeSelectedObjectSlabHeatingPlanner(event.detail.className));
    Events.registerEventListener(UPDATE_RENDER_SIZE_VALUE, updateRenderSizeValuesSlabHeatingPlanner);
    Events.registerEventListener(RIGHT_MOUSE_BUTTON_RELEASED, rightMouseButtonReleasedSlabHeatingPlanner);

    if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
        Load.loadProject();
    }

    Draw.enableRendering();
}

Events.registerEventListener(SETUP, setupSlabHeatingPlanner);