import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/constants.js";
import { Room } from "../../entities/Room.js";
import { ErrorCodes } from "../../errors/ErrorCodes.js";
import { Errors } from "../../errors/Errors.js";
import { GridActions } from "../../geometry/Grid/GridActions.js";
import { GridCalculations } from "../../geometry/Grid/GridCalculations.js";
import { CreatePoint } from "../../geometry/point/createPoint.js";
import { PointCalculations } from "../../geometry/point/PointCalculations.js";
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
        Errors.throwError(ErrorCodes.ROOM_NAME_NOT_UNIQUE);
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
        ElementStore.remove(selectedRoom);
        // @ts-ignore
        ApplicationState.roomCreationTemp = {};
        ApplicationState.selectedObject = null;
        ApplicationState.selectedRoom = null;
        Errors.throwError(ErrorCodes.ROOM_OVERLAP);
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
    const width = ApplicationState.roomCreationTemp.width;
    const height = ApplicationState.roomCreationTemp.height;
    const angleRad = ApplicationState.roomCreationTemp.angleRad;

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
            ApplicationState.roomCreationTemp.height = RoomCalculations.calculateHeightToMouseCursor(room);
            let third = PointCalculations.rotatePoint(CreatePoint.createPoint(width, ApplicationState.roomCreationTemp.height), angleRad);
            third = PointCalculations.addPoints([firstPoint, third]);
            ApplicationState.roomCreationTemp.third = third;
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
 * @param {(room: Room) => undefined} callback 
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