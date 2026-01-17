/**
 * Visszaadja a megadott azonosítójú dobozt
 * 
 * @param {string} id egyedi azonosító
 * @returns {Box}
 */
function getBoxById(id) {
    checkClass(id, CLASS_STRING);
    return elementStore.boxesById[id];
}

/**
 * Visszaadja a megadott azonosítójú dobozokat
 * 
 * @param {string[]} idList egyedi azonosítók listája
 * @returns {Box[]} a dobozokat tartalmazó array
 */
function getBoxesByIdList(idList) {
    checkClass(idList, CLASS_ARRAY);
    return idList.map(id => elementStore.boxesById[id]).filter(x => x);
}