/** @type {Function} */
let projectSpecificClearSelectionCacheFunction = () => {};

/**
 * Törli az összes kijelölhető objektum kijelölő cache értékét.
 * Ez a függvény minden renderelési ciklus elején fut le.
 * 
 * @returns {undefined}
 */
function clearSelectionCache() {
    cachedSelectableRoom = null;
    cachedSelectableBlueprint = null;

    projectSpecificClearSelectionCacheFunction();
}

/**
 * Beállítja a projekt specifikus választás ürítő függvényt.
 * 
 * @param {Function} func függvény
 * @returns {undefined}
 */
function setProjectSpecificClearSelectionCacheFunction(func) {
    projectSpecificClearSelectionCacheFunction = func;
}