import { CustomEventTypes } from "../../event/CustomEventTypes.js";
import { RoomService } from "../../service/RoomService.js";
import { ElementStore } from "../../store/ElementStore.js";

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
 * Szobák törlésével kapcsolatos műveletek.
 */
export const DeleteRoomAction = {
    clearRooms
};