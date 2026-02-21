import { Room } from "../../../common/entities/Room.js";
import { SlabHeaterGroup } from "../../entities/SlabHeaterGroup.js";
import { SlabHeaterGroupService } from "../../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";
import { DeleteBoxGroupAction } from "../boxgroup/DeleteBoxGroupAction.js";
import { DeleteSlabHeaterGroupAction } from "../slabHeaterGroup/DeleteSlabHeaterGroupAction.js";

/**
 * Kiválasztott szoba törlése utáni műveletek
 * 
 * @param {Room} room, eltávolított szoba.
 * @returns {undefined}
 */
function onSelectedRoomRemovedSlabHeatingPlanner(room) {
    const slabHeaterGroupsToDelete = SlabHeaterGroupService.findByRoomId(room.id);

    const slabHeatersToDelete = [];
    for (let slabHeaterGroup of slabHeaterGroupsToDelete) {
        for (let slabHeater of SlabHeaterService.findByIdList(slabHeaterGroup.slabHeaterIds)) {
            slabHeatersToDelete.push(slabHeater);
        }
    }

    slabHeatersToDelete.forEach(sh => SlabHeaterService.removeById(sh.id));
    slabHeaterGroupsToDelete.forEach(shg => SlabHeaterGroupService.removeById(shg.id));
}

/**
 * Szobák törlése utáni projektspecifikus műveletek
 * 
 * @returns {undefined}
 */
function onRoomsClearedSlabHeatingPlanner() {
    DeleteSlabHeaterGroupAction.clearSlabHeaterGroups();
    DeleteBoxGroupAction.clearBoxGroups();
}

/**
 * Szobák törlésével kapcsolatos projekt specifikus műveletek.
 */
export const SlabHeatingPlannerDeleteRoomAction = {
    onSelectedRoomRemovedSlabHeatingPlanner,
    onRoomsClearedSlabHeatingPlanner
};