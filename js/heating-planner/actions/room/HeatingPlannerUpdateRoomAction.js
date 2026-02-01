import { Room } from "../../../common/entities/Room.js";

/**
 * Újraszámolja a szobában lévő szerkezeti elemeket.
 * 
 * @param {Room} room 
 */
function recalculateBeamDefinitions(room) {
    if (!room) {
        return;
    }

    return undefined; // todo
}

/**
 * Projekt specifikus szoba módosító műveletek.
 */
export const HeatingPlannerUpdateRoomAction = {
    recalculateBeamDefinitions
};