/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjects() {
    elementStore.blueprints.forEach(bluePrint => drawBlueprint(bluePrint));
    elementStore.rooms.forEach(room => drawRoom(room));
    elementStore.panelGroups.forEach(pg => drawPanelGroup(pg));
    elementStore.structureElements.forEach(se => drawStructureElements(se));
    drawScaler();

    if (debugEnabled) {
        elementStore.rooms.forEach(r => drawRectangle(r.boundingBox));
        elementStore.rooms.forEach(r => drawRectangle(r.textBox));
        elementStore.panelGroups.forEach(pg => drawRectangle(pg.boundingBox));
        elementStore.panelGroups.forEach(pg => drawRectangle(pg.boundingBoxIncludingPipes));
        elementStore.panels.forEach(p => drawRectangle(p.boundingBox));
        elementStore.panels.forEach(p => drawRectangle(p.textBox));
        drawAxis();
    }
}