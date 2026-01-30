/**
 * Kiszámítja és visszaadja a szobában található CD30/60 tartóelemek mennyiségét méter mértékegységben
 * 
 * @param {Room} room 
 * @returns {Number}
 */
function calculateRoomCd3060Amount(room) {
    const structureElements = getStructureElementsById(room.structureElementsId);

    const alignedBeams = structureElements.alignedBeams;
    const crossBeams = structureElements.crossBeams;

    const alignedBeamsSumLength = alignedBeams.map(ab => calculateDistance(ab.p0, ab.p1)).reduce(sumFunction, 0);
    const crossBeamsSumLength = crossBeams.map(cb => calculateDistance(cb.p0, cb.p1)).reduce(sumFunction, 0);

    return (alignedBeamsSumLength + crossBeamsSumLength) / pixelsPerMetersRatio;
}