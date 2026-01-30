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
    elementStore.rooms.forEach(r => drawRectangle(r.boundingBox));
    elementStore.rooms.forEach(r => drawRectangle(r.textBox));

    elementStore.slabHeaterGroups.forEach(shg => drawRectangle(shg.boundingBox, RED, 2));
    elementStore.slabHeaterGroups.forEach(shg => drawRectangle(shg.boundingBoxIncludingPipes, RED, 2));
    elementStore.slabHeaters.forEach(sh => drawRectangle(sh.boundingBox));
    elementStore.slabHeaters.forEach(sh => drawRectangle(sh.textBox));

    elementStore.boxGroups.forEach(bg => drawRectangle(bg.boundingBox, RED, 2));
    elementStore.boxes.forEach(b => drawRectangle(b.boundingBox));
}