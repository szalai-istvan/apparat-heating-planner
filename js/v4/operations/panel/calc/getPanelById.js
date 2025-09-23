/**
 * Visszaadja a megadott azonosítójú fűtőelemet
 * 
 * @param {string} id Egyedi azonosító
 * @returns {Panel}
 */
function getPanelById(id) {
    return elementStore.panelsById[id];
}

/**
 * Visszaadja a megadott azonosítójú fűtőelemek listáját
 * 
 * @param {string[]} idList Egyedi azonosító lista
 * @returns {Panel[]} a megadott azonosítójú fűtőelemek listája
 */
function getPanelsByIdList(idList) {
    return idList.map(id => elementStore.panelsById[id]).filter(x => x);
}