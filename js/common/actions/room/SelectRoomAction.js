import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { Room } from "../../entities/Room.js";
import { RoomService } from "../../service/RoomService.js";
import { Validators } from "../../validators/Validators.js";
import { SelectionAction } from "../selection/SelectionAction.js";
import { SelectionCriteria } from "../selection/SelectionCriteria.js";
import { RoomCalculations } from "./RoomCalculations.js";
import { UpdateRoomAction } from "./UpdateRoomAction.js";

/** @type {Room} */
let cachedSelectableRoom = null;

/**
 * Megkeresi a kiválasztható szobát és visszaadja
 * 
 * @param {Room} room Opcionális paraméter, specifikálható a kiválasztandó szoba.
 * @returns {Room} a kiválasztott szoba.
 */
function selectRoom(room = undefined) {
    Validators.checkClass(room, Constants.classNames.room, true);

    room = room || checkForSelectableRoom();

    if (!room) {
        return undefined;
    }

    if (!RoomCalculations.selectedRoomIsConfiguredOrNoRoomIsSelected()) {
         // TODO ez nem okoz-e gondot, ha panelról váltok szobára?
        return ApplicationState.selectedRoom;
    }

    if (SelectionAction.deselectObject()) {
        room.isSelected = true;
        ApplicationState.selectedRoom = room;
        return room;
    }

    return undefined;
}

/**
 * Kiválasztható szoba megkeresése.
 * 
 * @returns {Room}
 */
function checkForSelectableRoom() {
    if (cachedSelectableRoom) {
        return cachedSelectableRoom;
    }

    const selection = RoomService.findAll().filter(r => SelectionCriteria.evaluateSelectionCriteria(r));
    const room = selection[0];
    if (room) {
        cachedSelectableRoom = room;
        return room;
    }
    return undefined;
}

/**
 * Megszűnteti a kiválasztott szoba kiválasztottságát
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectRoom() {
    const room = ApplicationState.selectedRoom;
    
    if (!room) {
        return true;
    }

    if (RoomCalculations.roomIsConfigured(room)) {
        room.isSelected = false;
        ApplicationState.selectedRoom = null;
        UpdateRoomAction.updateRoomSelectionBox(room);
        return true;
    }

    return false;
}

/**
 * Törli a kiválasztásra cachelt szobát
 * 
 * @returns {undefined}
 */
function clearRoomSelectionCache() {
    cachedSelectableRoom = null;
}

export const SelectRoomAction = {
    selectRoom,
    deselectRoom,
    clearRoomSelectionCache
};