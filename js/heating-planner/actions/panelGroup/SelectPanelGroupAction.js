import { SelectionAction } from "../../../common/actions/selection/SelectionAction.js";
import { SelectionCriteria } from "../../../common/actions/selection/SelectionCriteria.js";
import { RectangleCalculations } from "../../../common/geometry/Rectangle/RectangleCalculations.js";
import { RoomService } from "../../../common/service/RoomService.js";
import { Validators } from "../../../common/validators/Validators.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { HeatingPlannerConstants } from "../../appdata/HeatingPlannerConstants.js";
import { PanelGroup } from "../../entities/PanelGroup.js";
import { PanelGroupService } from "../../service/PanelGroupService.js";
import { PanelService } from "../../service/PanelService.js";
import { HeatingPlannerUpdateRoomAction } from "../room/HeatingPlannerUpdateRoomAction.js";
import { PanelGroupCalculations } from "./PanelGroupCalculations.js";
import { UpdatePanelGroupAction } from "./UpdatePanelGroupAction.js";


/** @type {PanelGroup} Cachelt kiválasztható szoba */
let cachedSelectablePanelGroup = null;

/**
 * Megkeresi és kiválasztja a fűtőelem csoportot és visszaadja
 * 
 * @param {PanelGroup} panelGroup specifikálható kiválasztandó fűtőelem csoport (opcionális).
 * @returns {PanelGroup} a kiválasztott fűtőelem csoport.
 */
function selectPanelGroup(panelGroup = undefined) {
    Validators.checkClass(panelGroup, HeatingPlannerConstants.classNames.panelGroup, true);

    panelGroup = panelGroup || checkForSelectablePanelGroup();
    if (!panelGroup) {
        return undefined;
    }

    if (panelGroup === HeatingPlannerApplicationState.selectedPanelGroup) {
        panelGroup.isSelected = true;
        panelGroup.isSelectedForDrag = true;

        setSelectedPanelGroupIndex(panelGroup);
        const room = RoomService.findById(panelGroup.roomId);
        panelGroup.roomId = null;
        HeatingPlannerUpdateRoomAction.recalculateBeamDefinitions(room);
        return panelGroup;
    }

    if (SelectionAction.deselectObject()) {
        panelGroup.isSelected = true;
        HeatingPlannerApplicationState.selectedPanelGroup = panelGroup;
        return panelGroup;
    }

    return undefined;
}

/**
 * Megkeresi a kiválasztható fűtőelem csoportot és visszaadja
 * 
 * @returns {PanelGroup} a kiválasztható fűtőelem csoport.
 */
function checkForSelectablePanelGroup() {
    if (cachedSelectablePanelGroup) {
        return cachedSelectablePanelGroup;
    }

    const selectablePanel = PanelService.findAll().filter(p => SelectionCriteria.evaluateSelectionCriteria(p))[0];
    if (!selectablePanel) {
        return undefined;
    }

    const selectablePanelGroup = PanelGroupService.findById(selectablePanel.groupId);
    if (selectablePanelGroup) {
        cachedSelectablePanelGroup = selectablePanelGroup;
        return selectablePanelGroup;
    }

    return undefined;
}

/**
 * Kiüríti a kiválasztásra cachelt fűtő csoportot.
 * 
 * @returns {undefined}
 */
function clearPanelGroupSelectionCache() {
    cachedSelectablePanelGroup = null;
}

/**
 * Megszűnteti a panelcsoport kijelölését
 * 
 * @returns {undefined}
 */
function deselectPanelGroup() {
    const selectedPanelGroup = HeatingPlannerApplicationState.selectedPanelGroup;
    if (!selectedPanelGroup) {
        return true;
    }

    const containingRoom = PanelGroupCalculations.getContainingRoom(selectedPanelGroup);

    if (!containingRoom) {
        displayMessage('A panelcsoport része vagy egésze szobán kívülre esik!');
        return false;
    }
    UpdatePanelGroupAction.assignPanelGroupToRoom(selectedPanelGroup, containingRoom);
    
    if (!PanelGroupCalculations.panelGroupAlignmentIsValid(containingRoom, selectedPanelGroup)) {
        displayMessage('Egymásra merőleges panelek nem lehetnek egy szobában!');
        return false;
    }

    UpdatePanelGroupAction.updatePositionDataIncludingMembers(selectedPanelGroup);
    selectedPanelGroup.isSelected = false;
    selectedPanelGroup.isSelectedForDrag = false;
    HeatingPlannerUpdateRoomAction.recalculateBeamDefinitions(containingRoom);
    HeatingPlannerApplicationState.selectedPanelGroup = null;


    return true;
}

/**
 * Beállítja a kattintott index értékét a panelcsoporton.
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {undefined}
 */
function setSelectedPanelGroupIndex(panelGroup) { // todo talán ez a beállítás lehetne a searchForSelectable metódus része
    Validators.checkClass(panelGroup, HeatingPlannerConstants.classNames.panelGroup);

    let index = 0;
    while (index < panelGroup.panelIds.length) {
        const panel = PanelService.findById(panelGroup.panelIds[index]);
        if (SelectionCriteria.evaluateSelectionCriteria(panel)) {
            panelGroup.clickedMemberIndex = index;
            return;
        }
        index++;
    }

    panelGroup.clickedMemberIndex = undefined;
}

/**
 * Panelcsoportok kiválasztásával kapcsolatos műveletek.
 */
export const SelectPanelGroupAction = {
    selectPanelGroup,
    deselectPanelGroup,
    clearPanelGroupSelectionCache
};