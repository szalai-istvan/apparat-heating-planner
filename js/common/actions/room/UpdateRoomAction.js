import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Room } from "../../entities/Room.js";
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

    const textSize = ApplicationState.roomTextSize;

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

    push();
    textSize(textSize);
    const textWidth = textWidth(room.name);
    room.selectionBox = CreateRectangle.createRectangleByMiddlePoint(centerPoint, textWidth, textSize, angleRad);
    pop();

    SelectionAction.deselectObject();

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
}

/**
 * Szoba updatelő műveletek.
 */
export const UpdateRoomAction = {
    finalizeRoom
};