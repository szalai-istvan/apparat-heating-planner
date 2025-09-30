/**
 * Újraszámolja a szerkezeti elemek definícióját.
 * 
 * @param {Room} room
 * @returns {undefined}
 */
function recalculateBeamDefinitions(room) {
    checkClass(room, CLASS_ROOM);
    const structureElements = getStructureElementsById(room.structureElementsId);
}