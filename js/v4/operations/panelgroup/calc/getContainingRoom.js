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

    const rooms = elementStore.rooms.filter(r => rectangleIsInsideRectangle(panelGroup.boundingBoxIncludingPipes, r.boundingBox));
    return rooms.length ? rooms[0] : undefined;
}