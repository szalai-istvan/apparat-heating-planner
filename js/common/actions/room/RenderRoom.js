import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/constants.js";
import { Room } from "../../entities/Room.js";
import { GridCalculations } from "../../geometry/Grid/GridCalculations.js";
import { PointCalculations } from "../../geometry/point/PointCalculations.js";
import { RectangleCalculations } from "../../geometry/Rectangle/RectangleCalculations.js";
import { MathTools } from "../../math/MathTools.js";
import { MouseCursor } from "../../ui/MouseCursor.js";
import { Validators } from "../../validators/Validators.js";
import { RoomCalculations } from "./RoomCalculations.js";

/**
 * Felrajzolja a kijelzőre a paraméterül kapott szobát.
 * 
 * @param {Room} room szoba
 * @returns {undefined}
 */
function renderRoom(room) {
    Validators.checkClass(room, Constants.classNames.room);

    if (RoomCalculations.roomIsConfigured(room)) {
        renderConfiguredRoom(room);
    } else {
        renderUnconfiguredRoom(room);
    }
}

/**
 * Konfigurált szoba rajzolása
 * 
 * @param {Room} room
 * @returns {undefined}
 */
function renderConfiguredRoom(room) {
    const centerPoint = RoomCalculations.getMiddlePoint(room);

    push();
    drawSettings(room);
    fill(Constants.room.roomFillColor);
    rectMode(CENTER);
    translate(centerPoint.x, centerPoint.y);
    rotate(room.angleRad);
    rect(0, 0, room.width, room.height);

    pop();

    drawRoomSize(room, room.width, room.height);
}

/**
 * Konfigurálatlan szoba rajzolása
 * 
 * @param {Room} room
 * @returns {undefined}
 */
function renderUnconfiguredRoom(room) {
    const roomCreationTemp = ApplicationState.roomCreationTemp;
    const tilted = roomCreationTemp.tilted;
    const firstPoint = roomCreationTemp.first;
    let angleRad = roomCreationTemp.angleRad;
    let secondPoint = roomCreationTemp.second;
    let thirdPoint = roomCreationTemp.third;
    let width = roomCreationTemp.width;
    let height = null;

    if (!firstPoint) {
        return;
    }

    push();

    drawSettings(room);

    if (!tilted) {
        secondPoint = GridCalculations.getClosestGlobalGridPointToCursorsCorrectedPosition();
        width = roomCreationTemp.width || (secondPoint.x - firstPoint.x);
        height = secondPoint.y - firstPoint.y;

        fill(Constants.room.roomFillColor);
        rect(firstPoint.x, firstPoint.y, width, height);

    } else {
        if (!secondPoint) {
            secondPoint = GridCalculations.getClosestGlobalGridPointToCursorsCorrectedPosition();
            width = PointCalculations.calculateDistance(secondPoint, firstPoint);
            if (secondPoint.x < firstPoint.x) {
                width *= -1;
            }
            angleRad = Math.atan((secondPoint.y - firstPoint.y) / (secondPoint.x - firstPoint.x));;
            line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);
        } else {
            thirdPoint = GridCalculations.getClosestGlobalGridPointToCursorsCorrectedPosition();
            height = RoomCalculations.calculateHeightToMouseCursor(room);

            translate(firstPoint.x, firstPoint.y);
            rotate(angleRad);
            rect(0, 0, width, height);
        }
    }

    pop();

    drawRoomSize(room, width, height, angleRad);
}

/**
 * Szoba méreteinek felrajzolása.
 * 
 * @param {Room} room 
 * @param {number} roomWidth 
 * @param {number} roomHeight 
 * @param {number} angleRad
 * @returns {undefined}
 */
function drawRoomSize(room, roomWidth, roomHeight, angleRad) {
    const pixelsPerMetersRatio = ApplicationState.pixelsPerMetersRatio;
    const firstPoint = room.firstPoint || ApplicationState.roomCreationTemp.first || null;
    angleRad = angleRad ?? room.angleRad ?? ApplicationState.roomCreationTemp.angleRad;

    if (!firstPoint) {
        return;
    }

    push();

    textSettings(room);
    translate(firstPoint.x, firstPoint.y);
    rotate(angleRad);

    if (roomWidth) {
        const width = `${MathTools.roundNumber(Math.abs(roomWidth / pixelsPerMetersRatio), 1)} m`;
        textAlign(CENTER, BOTTOM);
        text(width, roomWidth / 2, (Math.min(roomHeight, 0) || 0) - 5);
    }

    if (roomHeight) {
        const height = `${MathTools.roundNumber(Math.abs(roomHeight / pixelsPerMetersRatio), 1)} m`;
        textAlign(LEFT, CENTER);
        text(height, Math.max(roomWidth, 0) + 5, roomHeight / 2);
    }

    pop();
}

/**
 * Felrajzolja a szoba nevét a képernyőre
 * 
 * @param {Room} room 
 * @returns {undefined}
 */
function renderRoomName(room) {
    Validators.checkClass(room, Constants.classNames.room);

    if (!RoomCalculations.roomIsConfigured(room)) {
        return;
    }

    const center = room.isSelected ? MouseCursor.getMousePositionAbsolute() : room.selectionBox.middlePoint;

    push();

    textSettings(room);
    translate(center.x, center.y);
    rotate(room.angleRad);

    text(room.name, 0, 0);

    pop();
}

/**
 * Előkészíti a rajzbeállításokat a szoba rajzoláshoz.
 * 
 * @param {Room} room
 * @returns {undefined}
 */
function drawSettings(room) {
    const thickness = ApplicationState.roomLineWeight * (1 + room.isSelected * Constants.room.roomTextPopFactor);
    const color = room.isSelected ? Constants.ui.selectedTextColor : Constants.room.roomDefaultTextColor;
    strokeWeight(thickness);
    stroke(color);
}

/**
 * Előkészíti a rajzbeállításokat a szoba szövegeinek felrajzolásához.
 * 
 * @param {Room} room 
 * @returns {undefined}
 */
function textSettings(room) {
    textAlign(CENTER, CENTER);
    stroke(Constants.strings.black);
    strokeWeight(ApplicationState.roomNameOutlineWidth);

    const mousePosition = MouseCursor.getMousePositionAbsolute();
    const selectionBox = room.selectionBox;
    if (selectionBox && RectangleCalculations.pointIsInsideRectangle(mousePosition, selectionBox)) {
        fill(Constants.ui.selectedTextColor);
        textSize(ApplicationState.roomTextSize * Constants.room.roomTextPopFactor);
    } else {
        fill(Constants.ui.defaultTextColor);
        textSize(ApplicationState.roomTextSize);
    }
}

/**
 * Szoba renderelési műveletek
 */
export const RenderRoom = {
    renderRoom,
    renderRoomName
}