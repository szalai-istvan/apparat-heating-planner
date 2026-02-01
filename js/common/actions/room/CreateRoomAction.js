import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { Room } from "../../entities/Room.js";
import { GridActions } from "../../geometry/Grid/GridActions.js";
import { GridCalculations } from "../../geometry/Grid/GridCalculations.js";
import { PointCalculations } from "../../geometry/Point/PointCalculations.js";
import { RoomService } from "../../service/RoomService.js";
import { ElementStore } from "../../store/ElementStore.js";
import { MouseCursor } from "../../ui/MouseCursor.js";
import { Validators } from "../../validators/Validators.js";
import { SelectionAction } from "../selection/SelectionAction.js";
import { RoomCalculations } from "./RoomCalculations.js";
import { UpdateRoomAction } from "./UpdateRoomAction.js";

/**
 * Függvény, amely lefut a szoba létrehozása után.
 * 
 * @param {Room} room 
 * @returns {undefined}
 */
let onRoomCreatedCallback = (room) => {};

/**
 * Létrehoz egy szobát.
 * 
 * @param {string} name szoba neve
 * @param {boolean} tilted boolean flag, ferde-e a szoba 
 * @returns {boolean} true, ha sikerült a szobát létrehozni, egyébként false
 */
function createRoom(name, tilted) {
    Validators.checkClass(name, Constants.classNames.string);

    name = name.trim();

    if (roomNameAlreadyExists(name)) {
        displayMessage(`${name} nevű szoba már létezik. Egyedi nevet kell megadni.`);
        return false;
    }

    const room = new Room(name, tilted);
    ApplicationState.roomCreationTemp.tilted = tilted;
    ElementStore.save(room);
    SelectionAction.selectObject(room);

    onRoomCreatedCallback(room);
    return true;
}

/**
 * Hozzáadja a kurzor pillanatnyi abszolút koordinátáit a kijelölt szoba sarkaihoz
 * 
 * @returns {undefined}
 */
function addPointToSelectedRoom() {
    const selectedRoom = ApplicationState.selectedRoom;
    if (!selectedRoom) {
        return;
    }

    if (RoomCalculations.roomIsConfigured(selectedRoom)) {
        return;
    }

    if (!pointCanBeAddedToSelectedRoom()) {
        displayMessage('A pont felvétele átfedést okozna a szobák között. Válasszon másik pontot.');
        return;
    }

    if (RoomService.findAll().length === 1 && !ApplicationState.roomCreationTemp.width) {
        GridActions.setGlobalGridSeed(MouseCursor.getMousePositionAbsolute());
    }

    addPointToRoom(selectedRoom);
}

/**
 * Megállapítja, hogy az egérmutató pillanatnyi pozíciója hozzáadható-e a szobához.
 * 
 * @returns {boolean}
 */
function pointCanBeAddedToSelectedRoom() {
    const selectedRoom = ApplicationState.selectedRoom;
    return RoomService.findAll()
        .filter(r => r !== selectedRoom)
        .filter(r => RoomCalculations.mousePointerIsInsideRoom(r))
        .filter(r => !r.isSelected).length === 0;
}

/**
 * Hozzáadja a szobához a kurzor pozícióját.
 * 
 * @param {Room} room 
 * @returns {undefined}
 */
function addPointToRoom(room) {

    if (RoomCalculations.roomIsConfigured(room)) {
        return;
    }

    const mousePosition = GridCalculations.getClosestGlobalGridPointToCursorsCorrectedPosition();
    const firstPoint = ApplicationState.roomCreationTemp.first;
    const secondPoint = ApplicationState.roomCreationTemp.second;
    const thirdPoint = ApplicationState.roomCreationTemp.third;
    const width = ApplicationState.roomCreationTemp.width;
    const height = ApplicationState.roomCreationTemp.height;

    if (!firstPoint) {
        ApplicationState.roomCreationTemp.first = mousePosition;
        return;
    }

    if (room.tilted) {
        if (!width) {
            ApplicationState.roomCreationTemp.second = mousePosition;
            ApplicationState.roomCreationTemp.width = PointCalculations.calculateDistance(firstPoint, mousePosition);
            if (mousePosition.x < firstPoint.x) {
                ApplicationState.roomCreationTemp.width *= -1;
            }

            ApplicationState.roomCreationTemp.angleRad = Math.atan((mousePosition.y - firstPoint.y) / (mousePosition.x - firstPoint.x));
            return;
        }

        if (!height) {
            ApplicationState.roomCreationTemp.third = mousePosition;
            ApplicationState.roomCreationTemp.height = RoomCalculations.calculateHeightToMouseCursor(room);
            UpdateRoomAction.finalizeRoom(room);
        }
    } else {
        ApplicationState.roomCreationTemp.second = mousePosition;
        ApplicationState.roomCreationTemp.width = (mousePosition.x - firstPoint.x);
        ApplicationState.roomCreationTemp.height = (mousePosition.y - firstPoint.y);
        ApplicationState.roomCreationTemp.angleRad = 0.00;
        UpdateRoomAction.finalizeRoom(room);
    }
}

/**
 * Ellenőrzi, hogy létezik-e már a paraméterül megadott nevű szoba.
 * 
 * @param {string} name 
 * @returns {boolean}
 */
function roomNameAlreadyExists(name) {
    return RoomCalculations.getRoomNames().map(n => n.toLowerCase()).includes(name.toLowerCase());
}

/**
 * Regisztrál egy callback függvényt, amely szoba létrehozás után fog lefutni.
 * 
 * @param {Function} callback 
 */
function onRoomIsCreated(callback) {
    onRoomCreatedCallback = callback;
}

/**
 * Szoba létrehozással kapcsolatos függvények.
 */
export const CreateRoomAction = {
    createRoom,
    onRoomIsCreated,
    addPointToSelectedRoom
};