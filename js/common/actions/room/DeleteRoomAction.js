import { ApplicationState } from "../../appdata/ApplicationState.js";
import { CustomEventTypes } from "../../event/CustomEventTypes.js";
import { GridActions } from "../../geometry/Grid/GridActions.js";
import { RoomService } from "../../service/RoomService.js";
import { ElementStore } from "../../store/ElementStore.js";
import { SelectionAction } from "../selection/SelectionAction.js";

/**
 * Törli az összes létrehozott szobát
 * 
 * @returns {undefined}
 */
function clearRooms() {
    RoomService.removeAll();
    deselectRoom();
    Events.dispatchCustomEvent(CustomEventTypes.roomsCleared, {});
}

/**
 * Törli a kiválasztott szobát és a benne található fűtőelem csoportokat.
 * 
 * @returns {undefined}
 */
function removeSelectedRoom() {
    const room = ApplicationState.selectedRoom;
    if (!room) {
        return;
    }

    RoomService.removeById(room.id);
    ApplicationState.selectedRoom = null;

    SelectionAction.deselectObject();
    if (RoomService.findAll().length === 0) {
        GridActions.clearGrid();
    }

    Events.dispatchCustomEvent(CustomEventTypes.selectedRoomRemoved, {room});
}

/**
 * Szobák törlésével kapcsolatos műveletek.
 */
export const DeleteRoomAction = {
    clearRooms,
    removeSelectedRoom
};