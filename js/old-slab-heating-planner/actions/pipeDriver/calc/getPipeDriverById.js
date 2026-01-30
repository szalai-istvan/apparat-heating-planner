/**
 * Visszaadja a megadott azonosítójú csővezetőt
 * 
 * @param {string} id egyedi azonosító
 * @returns {PipeDriver}
 */
function getPipeDriverById(id) {
    checkClass(id, CLASS_STRING, true);
    return elementStore.pipeDriversById[id];
}

/**
 * Visszaadja a megadott azonosítójú csővezetőket
 * 
 * @param {string[]} idList egyedi azonosítók listája
 * @returns {PipeDriver[]} a csővezetőket tartalmazó array
 */
function getPipeDriversByIdList(idList) {
    checkClass(idList, CLASS_ARRAY);
    return idList.map(id => elementStore.pipeDriversById[id]).filter(x => x);
}