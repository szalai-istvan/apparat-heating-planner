/**
 * A paraméterül kapott födémfűtés csoport validálását végzi el, és visszaadja a tartalmazó szobát.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup födémfűtés csoport
 * @returns {Room} a tartalmazó szoba
 */
function validateSlabHeaterGroupPositionAndGetContainingRoom(slabHeaterGroup) {
    const containingRooms = [];

    for (let slabHeaterId of slabHeaterGroup.slabHeaterIds) {
        const slabHeater = getSlabHeaterById(slabHeaterId);

        const boundaryPoints = calculateSlabHeaterBoundaryPoints(slabHeater);
        const p1 = boundaryPoints.p1;
        const p2 = boundaryPoints.p2;

        const room = elementStore.rooms.filter(r => pointIsInsideRoom(r, p1) && pointIsInsideRoom(r, p2))[0];
        if (!room) {
             displayMessage('Az egyik kiválasztott födémfűtő elem része vagy egésze szobán kívülre kerül!<br/>Helyezze el máshová!');
             return undefined;
        }
        containingRooms.push(room);
    }

    const roomSet = new Set(containingRooms);
    if (roomSet.size > 1) {
        displayMessage('Az egyik kiválasztott födémfűtő elem része vagy egésze szobán kívülre kerül!<br/>Helyezze el máshová!');
        return undefined;
    }
    return roomSet.values().next().value;
}