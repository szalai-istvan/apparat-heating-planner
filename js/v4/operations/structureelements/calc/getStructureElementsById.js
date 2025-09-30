/**
 * Visszaadja a megadott azonosítójú szerkezeti elemet.
 * 
 * @param {string} id 
 * @returns {StructureElements}
 */
function getStructureElementsById(id) {
    return elementStore.structureElementsById[id];
}

/**
 * Visszaadja a megadott azonosítójú szerkezeti elemek listáját.
 * 
 * @param {string[]} idList
 * @returns {StructureElements[]}
*/
function getStructureElementsByIdList(idList) {
    return idList.map(id => elementStore.structureElementsById[id]).filter(x => x);
}