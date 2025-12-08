/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjects() {
    elementStore.blueprints.forEach(bluePrint => drawBlueprint(bluePrint));
    elementStore.rooms.forEach(room => drawRoom(room));
    drawScaler();
    elementStore.boxGroups.forEach(bg => drawBoxGroup(bg));
    elementStore.slabHeaterGroups.forEach(shg => drawSlabHeaterGroup(shg));

    drawAxis();
}