import { Constants } from "../../appdata/Constants.js";
import { RoomService } from "../../service/RoomService.js";
import { Room } from "../../entities/Room.js";
import { ApplicationState } from "../../appdata/ApplicationState.js";
import { RectangleCalculations } from "../../geometry/Rectangle/RectangleCalculations.js";
import { MouseCursor } from "../../ui/MouseCursor.js";
import { Validators } from "../../validators/Validators.js";
import { GridCalculations } from "../../geometry/Grid/GridCalculations.js";

/**
 * Megállapítja, hogy létezik-e legalább egy konfigurált szoba
 * 
 * @returns {boolean} true, ha létezik legalább egy konfigurált szoba, egyébként false.
 */
function configuredRoomsExist() {
    const rooms = RoomService.findAll();
    return rooms.length > 0 && roomIsConfigured(rooms[0]);
}

/**
 * Ellenőrzi, hogy a paraméterül kapott szoba összeállítása befejeződött-e
 * 
 * @param {Room} room
 * @returns {boolean} a szoba befejezettsége
 */
function roomIsConfigured(room) {
    Validators.checkClass(room, Constants.classNames.room, true);

    if (!room) {
        return false;
    }

    return room.boundingBox && room.selectionBox;
}

/**
 * Megállapítja, hogy ha van szoba kiválasztva, akkor konfigurált-e.
 * 
 * @returns {boolean} true, ha nincs szoba kiválasztva, vagy a kiválasztott szoba be van konfigurálva. Egyéb esetben false.
 */
function selectedRoomIsConfiguredOrNoRoomIsSelected() {
    if (!ApplicationState.selectedRoom) {
        return true;
    }

    return roomIsConfigured(ApplicationState.selectedRoom);
}

/**
 * Kilistázza a projektben szereplő szobák nevét.
 * 
 * @returns {string[]}
 */
function getRoomNames() {
    return RoomService.findAll().map(r => r.name).filter(x => x);
}

/**
 * Megállapítja, hogy az egérmutató a paraméterül kapott szobában található-e.
 * 
 * @param {Room} Room
 * @returns {boolean}
 */
function mousePointerIsInsideRoom(room) {
    if (!room || !room.boundingBox) {
        return false;
    }

    return RectangleCalculations.pointIsInsideRectangle(
        MouseCursor.getMousePositionAbsolute(),
        room.boundingBox
    );
}

/**
 * Kiszámítja, hogy a konfigurálatlan szoba alapvonalától milyen távolságra van az egérmutató.
 * 
 * @param {Room} room 
 * @returns {Number}, a kurzor távolsága a szoba alapvonalától
 */
function calculateHeightToMouseCursor(room) {
    const angle = getRoomAngleRad(room);
    const firstPoint = ApplicationState.roomCreationTemp.first;
    const mousePosition = GridCalculations.getClosestGlobalGridPointToCursorsCorrectedPosition();
    const deltaX = mousePosition.x - firstPoint.x;
    const deltaY = mousePosition.y - firstPoint.y;

    return deltaY * Math.cos(angle) - deltaX * Math.sin(angle);
}

/**
 * Visszaadja a szoba szögét
 * 
 * @param {Room} room 
 */
function getRoomAngleRad(room) {
    if (roomIsConfigured(room)) {
        return room.boundingBox.lines[1].angleRad;
    }

    return ApplicationState.roomCreationTemp.angleRad;
}

/**
 * Validálja a szoba pozícióját
 * 
 * @param {Room} room 
 * @returns {boolean} true, ha a szoba pozíciója érvénytelen.
 */
function roomPositionIsInvalid(room) {
    if (!room || !room.boundingBox) {
        return false;
    }

    const otherRooms = RoomService.findAll().filter(r => r !== room);
    
    for (let otherRoom of otherRooms) {
        if (RectangleCalculations.rectanglesOverlap(otherRoom.boundingBox, room.boundingBox)) {
            return true;
        }
    }

    return false;
}

/**
 * Szoba kalkuláció függvények
 */
export const RoomCalculations = {
    configuredRoomsExist,
    roomIsConfigured,
    getRoomNames,
    selectedRoomIsConfiguredOrNoRoomIsSelected,
    mousePointerIsInsideRoom,
    calculateHeightToMouseCursor,
    roomPositionIsInvalid
};