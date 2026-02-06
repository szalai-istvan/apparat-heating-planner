import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Room } from "../../entities/Room.js";
import { ErrorCodes } from "../../errors/ErrorCodes.js";
import { Errors } from "../../errors/Errors.js";
import { GridDefinition } from "../../geometry/Grid/GridDefinition.js";
import { CreateLine } from "../../geometry/Line/CreateLine.js";
import { CreateRectangle } from "../../geometry/Rectangle/CreateRectangle.js";
import { RectangleCalculations } from "../../geometry/Rectangle/RectangleCalculations.js";
import { ElementStore } from "../../store/ElementStore.js";
import { MouseCursor } from "../../ui/MouseCursor.js";
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
        ElementStore.remove(room);
        ApplicationState.roomCreationTemp = {};
        ApplicationState.selectedObject = null;
        ApplicationState.selectedRoom = null;
        Errors.throwError(ErrorCodes.ROOM_OVERLAP);
        return;
    }

    room.roomGridDefinition = new GridDefinition();
    room.roomGridDefinition.angleRad = angleRad;
    room.roomGridDefinition.referencePoint = firstPoint;
    room.roomGridDefinition.cosAlpha = Math.cos(angleRad);
    room.roomGridDefinition.sinAlpha = Math.sin(angleRad);
    // @ts-ignore
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
    const proposedSelectionBox = CreateRectangle.copyRectangleAtMiddlePoint(room.selectionBox, MouseCursor.getMousePositionAbsolute());
    if (RectangleCalculations.rectangleIsInsideRectangle(proposedSelectionBox, room.boundingBox)) {
        room.selectionBox = proposedSelectionBox;
    }
}

/**
 * Szoba updatelő műveletek.
 */
export const UpdateRoomAction = {
    finalizeRoom,
    updateRoomSelectionBox
};