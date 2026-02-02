import { Room } from "../../../common/entities/Room.js";
import { PanelGroupService } from "../../service/PanelGroupService.js";
import { StructureElementsService } from "../../service/StructureElementsService.js";
import { DeletePanelGroupAction } from "../panelGroup/DeletePanelGroupAction.js";
import { RecalculateStructureElements } from "../structureElements/RecalculateStructureElements.js";

/**
 * Szobák törlése utáni projektspecifikus műveletek
 * 
 * @returns {undefined}
 */
function onRoomsClearedHeatingPlanner() {
    StructureElementsService.removeAll();
    DeletePanelGroupAction.clearPanelGroups();
}

/**
 * Kiválasztott szoba törlése utáni műveletek
 * 
 * @param {Room} room, eltávolított szoba
 * @returns {undefined}
 */
function onSelectedRoomRemovedHeatingPlanner(room) {
    StructureElementsService.removeById(room.structureElementsId);

    const panelGroupsToDelete = PanelGroupService.findByRoomId(room.id);
    panelGroupsToDelete.forEach(pg => PanelGroupService.removeById(pg.id));
}

export const HeatingPlannerDeleteRoomAction = {
    onRoomsClearedHeatingPlanner,
    onSelectedRoomRemovedHeatingPlanner
};