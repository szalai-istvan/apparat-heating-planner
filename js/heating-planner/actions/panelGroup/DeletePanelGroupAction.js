import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { PanelGroupService } from "../../service/PanelGroupService.js";
import { PanelService } from "../../service/PanelService.js";
import { RecalculateStructureElements } from "../structureElements/RecalculateStructureElements.js";

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
    RecalculateStructureElements.recalculateBeamDefinitionsByRoomId(panelGroup.roomId);
}

/**
 * Törli az összes panelcsoportot.
 * 
 * @returns {undefined}
 */
function clearPanelGroups() {
    PanelGroupService.removeAll();
    PanelService.removeAll();
    
    HeatingPlannerApplicationState.selectedPanelGroup = null;
    HeatingPlannerApplicationState.selectedObject = null;
}

/**
 * Fűtőelem csoportok törlésével kapcsolatos műveletek.
 */
export const DeletePanelGroupAction = {
    removeSelectedPanelGroup,
    clearPanelGroups
};