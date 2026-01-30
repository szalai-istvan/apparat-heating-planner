import { CreateRoomAction } from "../actions/room/CreateRoomAction.js";
import { AddRoomDialog } from "../ui/dialog/AddRoomDialog.js";
import { UserActionHandler } from "./userActionHandler/UserActionHandler.js";

/**
 * Megjeleníti a szoba létrehozás dialógust.
 * 
 * @returns {undefined}
 */
function showAddRoomDialog() {
    UserActionHandler.handleUserActionNoParam(AddRoomDialog.showAddRoomDialog);
}

/**
 * Hozzáad egy pontot a kiválasztott félkész szobához.
 * 
 * @returns {undefined}
 */
function addPointToSelectedRoom() {
    UserActionHandler.handleUserActionNoParam(CreateRoomAction.addPointToSelectedRoom);
}

/**
 * Szobákkal kapcsolatos felhasználói interakciók.
 */
export const RoomAPI = {
    showAddRoomDialog,
    addPointToSelectedRoom
};