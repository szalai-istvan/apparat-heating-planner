let projectSpecificRenderTranslatedObjects = () => {};
let projectSpecificDebugOnlyRenderTranslatedObjects = () => {};

/**
 * Felrajzolja a kijelzőre a draggel korrigált pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderTranslatedObjects() {
    elementStore.blueprints.forEach(bluePrint => drawBlueprint(bluePrint));
    elementStore.rooms.forEach(room => drawRoom(room));
    
    projectSpecificRenderTranslatedObjects();

    elementStore.rooms.forEach(room => drawRoomName(room));
    drawScaler();

    if (debugEnabled) {
        projectSpecificDebugOnlyRenderTranslatedObjects();
        drawAxis();
    }
}

/**
 * Beállítja a projekt specifikus renderelési függvényt.
 * 
 * @param {Function} func 
 */
function setprojectSpecificRenderTranslatedObjects(func) {
    projectSpecificRenderTranslatedObjects = func;
}


/**
 * Beállítja a projekt specifikus debug-only renderelési függvényt.
 * 
 * @param {Function} func 
 */
function setprojectSpecificDebugOnlyRenderTranslatedObjects(func) {
    projectSpecificDebugOnlyRenderTranslatedObjects = func;
}