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

}