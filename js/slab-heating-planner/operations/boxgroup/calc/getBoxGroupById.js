/**
 * Visszaadja a megadott egyedi azonosítóval rendelkező dobozcsoportot
 * 
 * @param {string} id Egyedi azonosító
 * @returns {BoxGroup}
 */
function getBoxGroupById(id) {
    return elementStore.boxGroupsById[id];
}