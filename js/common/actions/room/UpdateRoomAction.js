import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Room } from "../../entities/Room.js";
import { GridDefinition } from "../../geometry/Grid/GridDefinition.js";
import { CreateLine } from "../../geometry/Line/CreateLine.js";
import { PointCalculations } from "../../geometry/Point/PointCalculations.js";
import { CreateRectangle } from "../../geometry/Rectangle/CreateRectangle.js";
import { SelectionAction } from "../selection/SelectionAction.js";
import { RoomCalculations } from "./RoomCalculations.js";

/**
 * Véglegesíti a szobát.
 * 
 * @param {Room} room 
 * @returns {undefined}
 */
function finalizeRoom(room) {
    const tilted = ApplicationState.roomCreationTemp.tilted;
    const firstPoint = ApplicationState.roomCreationTemp.first;
    const secondPoint = ApplicationState.roomCreationTemp.second;
    const thirdPoint = ApplicationState.roomCreationTemp.third;
    const width = ApplicationState.roomCreationTemp.width;
    const height = ApplicationState.roomCreationTemp.height;
    const angleRad = ApplicationState.roomCreationTemp.angleRad;

    const roomTextSize = ApplicationState.roomTextSize;

    let centerPoint;
    if (tilted) {
        centerPoint = CreateLine.createLine(firstPoint, thirdPoint).middlePoint;
    } else {
        centerPoint = CreateLine.createLine(firstPoint, secondPoint).middlePoint;
    }

    room.boundingBox = CreateRectangle.createRectangleByMiddlePoint(centerPoint, width, height, angleRad);
    room.width = width;
    room.height = height;
    room.firstPoint = firstPoint;
    room.angleRad = angleRad;

    push();
    textSize(roomTextSize);
    const roomTextWidth = textWidth(room.name);
    room.selectionBox = CreateRectangle.createRectangleByMiddlePoint(centerPoint, roomTextWidth, roomTextSize, angleRad);
    pop();

    
    if (RoomCalculations.roomPositionIsInvalid(room)) {
        displayMessage('A szoba pozíciója érvénytelen, átfedést okoz szobák között!');
        elementStore.remove(room);
        return;
    }
    
    room.roomGridDefinition = new GridDefinition();
    room.roomGridDefinition.angleRad = angleRad;
    room.roomGridDefinition.referencePoint = firstPoint;
    room.roomGridDefinition.cosAlpha = Math.cos(angleRad);
    room.roomGridDefinition.sinAlpha = Math.sin(angleRad);
    ApplicationState.roomCreationTemp = {};

    SelectionAction.deselectObject();
}

/**
 * Szoba kiválasztó dobozának újraszámolása.
 * 
 * @param {Room} room
 * @returns {undefined} 
 */
function updateRoomSelectionBox(room) {
    
}

/**
 * Szoba updatelő műveletek.
 */
export const UpdateRoomAction = {
    finalizeRoom,
    updateRoomSelectionBox
};