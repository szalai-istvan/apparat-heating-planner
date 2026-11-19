import { SelectionAction } from "../../common/actions/selection/SelectionAction.js";
import { Constants } from "../../common/appdata/constants.js";
import { CustomEventTypes } from "../../common/event/customEventTypes.js";
import { Events } from "../../common/event/Events.js";
import { i18n } from "../../common/i18n/i18n.js";
import { Load } from "../../common/io/load.js";
import { Save } from "../../common/io/save.js";
import { Draw } from "../../common/p5/draw.js";
import { TranslatedObjectRenderer } from "../../common/render/TranslatedObjectRenderer.js";
import { SelectBoxGroupAction } from "../actions/boxgroup/SelectBoxGroupAction.js";
import { SelectPipeDriverAction } from "../actions/pipeDriver/SelectPipeDriverAction.js";
import { SlabHeatingPlannerDeleteRoomAction } from "../actions/room/SlabHeatingPlannerDeleteRoomAction.js";
import { SlabHeatingPlannerScalingAction } from "../actions/scale/SlabHeatingPlannerScalingActions.js";
import { SlabHeatingPlannerSelectionAction } from "../actions/selection/SlabHeatingPlannerSelectionAction.js";
import { SelectSlabHeaterGroupAction } from "../actions/slabHeaterGroup/SelectSlabHeaterGroupAction.js";
import { SlabHeatingPlannerI18n } from "../i18n/SlabHeatingPlannerI18n.js";
import { LoadSlabHeatingPlanner } from "../io/LoadSlabHeatingPlanner.js";
import { SaveSlabHeatingPlanner } from "../io/SaveSlabHeatingPlanner.js";
import { SlabHeatingPlannerTranslatedObjectRenderer } from "../render/renderTranslatedObjectsSlabHeatingPlanner.js";
import { ElementStoreSlabHeatingPlanner } from "../store/ElementStoreSlabHeatingPlanner.js";
import { UiLayoutSlabHeatingPlanner } from "../ui/UiLayoutSlabHeatingPlanner.js";
import { SlabHeatingPlannerRightMouseButton } from "./mouseReleasedSlabHeater.js";

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
        SelectSlabHeaterGroupAction.searchForSelectableSlabHeaterGroup,
        SelectBoxGroupAction.searchForSelectableBoxGroup,
        SelectPipeDriverAction.searchForSelectablePipeDriver,
        SelectionAction.searchForSelectableBlueprint
    ]);
    SelectionAction.setProjectSpecificSelectObjectFunction(SlabHeatingPlannerSelectionAction.selectObjectSlabHeatingPlanner);
    SelectionAction.setProjectSpecificDeselectFunction(SlabHeatingPlannerSelectionAction.deselectObjectSlabHeatingPlanner);
    SelectionAction.setProjectSpecificClearSelectionCacheFunction(SlabHeatingPlannerSelectionAction.clearSelectionCacheSlabHeatingPlanner);

    // rendering config
    TranslatedObjectRenderer.setProjectSpecificRenderTranslatedObjects(SlabHeatingPlannerTranslatedObjectRenderer.renderTranslatedObjectsSlabHeatingPlanner);
    TranslatedObjectRenderer.setProjectSpecificDebugOnlyRenderTranslatedObjects(SlabHeatingPlannerTranslatedObjectRenderer.renderDebugOnlyTranslatedObjectsSlabHeatingPlanner);

    // i18n config
    i18n.setProjectSpecificI18nFunction(SlabHeatingPlannerI18n.internationalizeSlabHeatingPlanner);
    
    // other listeners
    Events.registerEventListener(CustomEventTypes.roomsCleared, SlabHeatingPlannerDeleteRoomAction.onRoomsClearedSlabHeatingPlanner);
    Events.registerEventListener(CustomEventTypes.selectedRoomRemoved, SlabHeatingPlannerDeleteRoomAction.onSelectedRoomRemovedSlabHeatingPlanner);
    Events.registerEventListener(CustomEventTypes.rotateSelectedObject, SlabHeatingPlannerSelectionAction.rotateSelectedObjectSlabHeatingPlanner);
    Events.registerEventListener(CustomEventTypes.removeSelectedObject, SlabHeatingPlannerSelectionAction.removeSelectedObjectSlabHeatingPlanner);
    Events.registerEventListener(CustomEventTypes.updateRenderSizeValues, SlabHeatingPlannerScalingAction.updateRenderSizeValuesSlabHeatingPlanner);
    Events.registerEventListener(CustomEventTypes.rightMouseButtonReleased, SlabHeatingPlannerRightMouseButton.slabHeatingPlannerRightMouseButtonReleased);

    if (Constants.debug.saveToLocalStorageEnabled) {
        Load.loadProject();
    }

    const lang = localStorage.getItem(Constants.i18n.languageKeyLocalStorage) || 'hu';
    Events.dispatchCustomEvent(CustomEventTypes.changeLanguage, lang);
    Draw.enableRendering();
}

Events.registerEventListener(CustomEventTypes.setup, setupSlabHeatingPlanner);