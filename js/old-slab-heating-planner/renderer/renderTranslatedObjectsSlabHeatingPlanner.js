/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú projekt specifikus elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjectsSlabHeatingPlanner() {
    elementStore.boxGroups.forEach(bg => drawBoxGroup(bg));
    elementStore.slabHeaterGroups.forEach(shg => drawSlabHeaterGroup(shg));
}

/**
 * Felrajzolja a kijelzőre a debug módban megjelenítendő draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderDebugOnlyTranslatedObjectsSlabHeatingPlanner() {
    elementStore.rooms.forEach(r => RenderRectangle.renderRectangle(r.boundingBox));
    elementStore.rooms.forEach(r => RenderRectangle.renderRectangle(r.textBox));

    elementStore.slabHeaterGroups.forEach(shg => RenderRectangle.renderRectangle(shg.boundingBox, RED, 2));
    elementStore.slabHeaterGroups.forEach(shg => RenderRectangle.renderRectangle(shg.boundingBoxIncludingPipes, RED, 2));
    elementStore.slabHeaters.forEach(sh => RenderRectangle.renderRectangle(sh.boundingBox));
    elementStore.slabHeaters.forEach(sh => RenderRectangle.renderRectangle(sh.textBox));

    elementStore.boxGroups.forEach(bg => RenderRectangle.renderRectangle(bg.boundingBox, RED, 2));
    elementStore.boxes.forEach(b => RenderRectangle.renderRectangle(b.boundingBox));
}