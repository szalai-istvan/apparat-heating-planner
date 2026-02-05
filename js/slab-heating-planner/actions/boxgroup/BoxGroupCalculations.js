import { Room } from "../../../common/entities/Room.js";
import { RectangleCalculations } from "../../../common/geometry/Rectangle/RectangleCalculations.js";
import { RoomService } from "../../../common/service/RoomService.js";
import { BoxGroup } from "../../entities/BoxGroup.js";

/**
 * Megkeresi a szobát, amely teljes egészében tartalmazza a paraméterül kapott doboz csoportot
 * 
 * @param {BoxGroup} boxGroup 
 * @returns {Room}
 */
function getContainingRoom(boxGroup) {
    if (!boxGroup.boundingBox) {
        return undefined;
    }

    const rooms = RoomService.findAll().filter(r => RectangleCalculations.rectangleIsInsideRectangle(boxGroup.boundingBox, r.boundingBox));
    return rooms[0];
}

/**
 * Kiszámítja az összesített szögét a dobozcsoportnak
 * 
 * @param {BoxGroup} boxGroup 
 * @returns {number}
 */
function getTotalAngleRad(boxGroup) {
    return boxGroup.alignment * HALF_PI + boxGroup.angleRad;

}

/**
 * Dobozcsoport kalkulációk
 */
export const BoxGroupCalculations = {
    getTotalAngleRad,
    getContainingRoom
};