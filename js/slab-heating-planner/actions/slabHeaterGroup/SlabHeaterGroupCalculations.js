import { Room } from "../../../common/entities/Room.js";
import { RectangleCalculations } from "../../../common/geometry/Rectangle/RectangleCalculations.js";
import { RoomService } from "../../../common/service/RoomService.js";
import { SlabHeaterGroup } from "../../entities/SlabHeaterGroup.js";

/**
 * Megkeresi a szobát, amely teljes egészében tartalmazza a paraméterül kapott födémfűtő csoportot
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {Room}
 */
function getContainingRoom(slabHeaterGroup) {
    if (!slabHeaterGroup.boundingBox) {
        return undefined;
    }

    const rooms = RoomService.findAll().filter(r => RectangleCalculations.rectangleIsInsideRectangle(slabHeaterGroup.boundingBox, r.boundingBox));
    return rooms[0];
}

/**
 * Visszaadja a slabHeatercsoport szögét
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {number}
 */
function getTotalAngleRad(slabHeaterGroup) {
    return slabHeaterGroup.alignment * HALF_PI + slabHeaterGroup.angleRad;
}

/**
 * Megállapítja, hogy nagy betűkkel kell-e írni a födémfűtő típusát.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {boolean}
 */
function shouldUseLargeText(slabHeaterGroup) {
    return (slabHeaterGroup.width > 0.8 && slabHeaterGroup.length > 1.6) || (slabHeaterGroup.width < 0.9 && slabHeaterGroup.length > 1.9);
}

/**
 * Födémfűtő csoportokkal kapcsolatos kalkulációk.
 */
export const SlabHeaterGroupCalculations = {
    getTotalAngleRad,
    getContainingRoom,
    shouldUseLargeText
};