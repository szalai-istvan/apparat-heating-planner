/**
 * Visszaadja a megadott azonosítójú fűtőelemcsoportot
 * 
 * @param {string} id Egyedi azonosító
 * @returns {PanelGroup}
 */
function getPanelGroupById(id) {
    return elementStore.panelGroupsById[id];
}

/**
 * Visszaadja a megadott azonosítójú fűtőelemcsoportok listáját
 * 
 * @param {string[]} idList Egyedi azonosító lista
 * @returns {PanelGroup[]} a megadott azonosítójú fűtőelemcsoportok listája
 */
function getPanelGroupsByIdList(idList) {
    return idList.map(id => elementStore.panelGroupsById[id]).filter(x => x);
}