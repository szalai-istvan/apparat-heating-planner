/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjectsHeatingPlanner() {
    elementStore.panelGroups.forEach(pg => drawPanelGroup(pg));
    elementStore.structureElements.forEach(se => drawStructureElements(se));
    elementStore.structureElements.forEach(se => drawUd30(se));
    elementStore.panelGroups.forEach(pg => drawPanelGroupType(pg));
}

/**
 * Felrajzolja a kijelzőre a debug módban megjelenítendő draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderDebugOnlyTranslatedObjectsHeatingPlanner() {
    elementStore.rooms.forEach(r => drawRectangle(r.boundingBox));
    elementStore.rooms.forEach(r => drawRectangle(r.textBox));
    elementStore.panelGroups.forEach(pg => drawRectangle(pg.boundingBox));
    elementStore.panelGroups.forEach(pg => drawRectangle(pg.boundingBoxIncludingPipes));
    elementStore.panels.forEach(p => drawRectangle(p.boundingBox));
    elementStore.panels.forEach(p => drawRectangle(p.textBox));
}