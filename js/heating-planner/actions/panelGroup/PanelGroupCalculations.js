import { Room } from "../../../common/entities/Room.js";
import { Point } from "../../../common/geometry/Point/Point.js";
import { RectangleCalculations } from "../../../common/geometry/Rectangle/RectangleCalculations.js";
import { RoomService } from "../../../common/service/RoomService.js";
import { Panel } from "../../entities/Panel.js";
import { PanelGroup } from "../../entities/PanelGroup.js";
import { PanelGroupService } from "../../service/PanelGroupService.js";

/**
 * Visszaadja a panelcsoport középpontját.
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {Point}
 */
function getCenterPoint(panelGroup) {
    if (panelGroup.boundingBox) {
        return panelGroup.boundingBox.middlePoint;
    }

    return undefined;
}

/**
 * Visszaadja a panelcsoport szögét
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {number}
 */
function getTotalAngleRad(panelGroup) {
    return panelGroup.alignment * HALF_PI + panelGroup.angleRad;
}

/**
 * Megállapítja, hogy létezik-e legalább egy panelcsoport.
 * 
 * @returns {boolean}
 */
function panelGroupsExist() {
    return PanelGroupService.findAll().length > 0;
}

/**
 * Megkeresi a szobát, amely teljes egészében tartalmazza a paraméterül kapott panelcsoportot
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {Room}
 */
function getContainingRoom(panelGroup) {
    if (!panelGroup.boundingBoxIncludingPipes) {
        return undefined;
    }

    const rooms = RoomService.findAll().filter(r => RectangleCalculations.rectangleIsInsideRectangle(panelGroup.boundingBoxIncludingPipes, r.boundingBox));
    return rooms[0];
}

/**
 * Megállapítja, hogy a panelcsoport iránya érvényes-e.
 * 
 * @param {Room} room 
 * @param {PanelGroup} panelGroup 
 * @returns {boolean} true, ha érvényes a panelcsoport iránya
 */
function panelGroupAlignmentIsValid(room, panelGroup) {
    const panelGroups = PanelGroupService.findByRoomId(room.id);
    const alignments = panelGroups.map(pg => pg.alignment).map(alignment => alignment % 2);
    return new Set(alignments).size === 1;
}

export const PanelGroupCalculations = {
    panelGroupsExist,
    getCenterPoint,
    getTotalAngleRad,
    getContainingRoom,
    panelGroupAlignmentIsValid
};