/**
 * Megkeresi a szobát, amely teljes egészében tartalmazza a paraméterül kapott panelcsoportot
 * 
 * @param {PanelGroup} panelGroup 
 * @returns {Room}
 */
function getContainingRoom(panelGroup) {
    if (!panelGroup.boundingBox) {
        return undefined;
    }

    const rooms = elementStore.rooms.filter(r => rectangleIsInsideRectangle(panelGroup.boundingBox, r.boundingBox));
    return rooms.length ? rooms[0] : undefined;
}