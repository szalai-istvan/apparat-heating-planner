import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { ElementStore } from "../../../common/store/ElementStore.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { PanelGroup } from "../../entities/PanelGroup.js";
import { PanelGroupService } from "../../service/PanelGroupService.js";
import { PanelService } from "../../service/PanelService.js";

/**
 * Eltávolítja a kiválasztott kapott panelcsoportot.
 * 
 * @returns {undefined}
 */
function removeSelectedPanelGroup() {
    const panelGroup = HeatingPlannerApplicationState.selectedPanelGroup;
    if (!panelGroup) {
        return;
    }

    panelGroup.panelIds.forEach(pid => PanelService.removeById(pid));
    PanelGroupService.removeById(panelGroup.id);
    HeatingPlannerApplicationState.selectedPanelGroup = null;
    ApplicationState.selectedObject = null;
    recalculateBeamDefinitionsByRoomId(panelGroup.roomId);
}

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