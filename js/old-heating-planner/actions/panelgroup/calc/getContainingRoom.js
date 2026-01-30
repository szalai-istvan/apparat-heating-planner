/**
 * Megkeresi a szobát, amely teljes egészében tartalmazza a paraméterül kapott panelcsoportot
 * 
 * @param {PanelGroup} panelGroup 
 * @param {Room[]} roomListToCheck (opcionális)
 * @returns {Room}
 */
function getContainingRoom(panelGroup, roomListToCheck = undefined) {
    if (!panelGroup.boundingBoxIncludingPipes) {
        return undefined;
    }

    roomListToCheck = roomListToCheck || elementStore.rooms;
    const rooms = roomListToCheck.filter(r => rectangleIsInsideRectangle(panelGroup.boundingBoxIncludingPipes, r.boundingBox));
    return rooms.length ? rooms[0] : undefined;
}