/**
 * Visszaadja a megadott egyedi azonosítójú födémfűtő csoportot.
 * 
 * @param {string} id Egyedi azonosító
 * @returns {SlabHeaterGroup}
 */
function getSlabHeaterGroupById(id) {
    return elementStore.slabHeaterGroupsById[id];
}