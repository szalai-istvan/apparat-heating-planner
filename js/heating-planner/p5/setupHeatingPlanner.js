import { SelectionAction } from "../../common/actions/selection/SelectionAction.js";
import { Constants } from "../../common/appdata/Constants.js";
import { CustomEventTypes } from "../../common/event/CustomEventTypes.js";
import { Events } from "../../common/event/Events.js";
import { Load } from "../../common/io/load.js";
import { Save } from "../../common/io/save.js";
import { Draw } from "../../common/p5/draw.js";
import { TranslatedObjectRenderer } from "../../common/render/TranslatedObjectRenderer.js";
import { UpdatePanelGroupAction } from "../actions/panelGroup/UpdatePanelGroupAction.js";
import { HeatingPlannerDeleteRoomAction } from "../actions/room/HeatingPlannerDeleteRoomAction.js";
import { HeatingPlannerScalingActions } from "../actions/scaling/HeatingPlannerScalingActions.js";
import { HeatingPlannerSelectionAction } from "../actions/selection/HeatingPlannerSelectionAction.js";
import { LoadHeatingPlanner } from "../io/loadHeatingPlanner.js";
import { SaveHeatingPlanner } from "../io/SaveHeatingPlanner.js";
import { HeatingPlannerTranslatedObjectRenderer } from "../render/HeatingPlannerTranslatedObjectRenderer.js";
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
    SelectionAction.setProjectSpecificClearSelectionCacheFunction(HeatingPlannerSelectionAction.clearSelectionCacheHeatingPlanner);
    SelectionAction.setProjectSpecificDeselectFunction(HeatingPlannerSelectionAction.deselectObjectHeatingPlanner);
    SelectionAction.setProjectSpecificSelectObjectFunction(HeatingPlannerSelectionAction.selectObjectHeatingPlanner);

    // rendering config
    TranslatedObjectRenderer.setProjectSpecificRenderTranslatedObjects(HeatingPlannerTranslatedObjectRenderer.renderTranslatedObjectsHeatingPlanner);
    TranslatedObjectRenderer.setProjectSpecificDebugOnlyRenderTranslatedObjects(HeatingPlannerTranslatedObjectRenderer.renderDebugOnlyTranslatedObjectsHeatingPlanner);

    // other listeners
    Events.registerEventListener(CustomEventTypes.roomsCleared, HeatingPlannerDeleteRoomAction.onRoomsClearedHeatingPlanner);
    Events.registerEventListener(CustomEventTypes.rotateSelectedObject, UpdatePanelGroupAction.rotateSelectedPanelGroup);
    Events.registerEventListener(CustomEventTypes.selectedRoomRemoved, HeatingPlannerDeleteRoomAction.onSelectedRoomRemovedHeatingPlanner);
    Events.registerEventListener(CustomEventTypes.removeSelectedObject, HeatingPlannerSelectionAction.removeSelectedObjectHeatingPlanner);
    Events.registerEventListener(CustomEventTypes.updateRenderSizeValues, HeatingPlannerScalingActions.updateRenderSizeValuesHeatingPlanner);

    if (Constants.debug.saveToLocalStorageEnabled) {
        Load.loadProject();
    }

    Draw.enableRendering();
}

Events.registerEventListener(CustomEventTypes.setup, setupHeatingPlanner);