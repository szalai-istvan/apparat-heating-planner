/**
 * Visszaadja a megadott azonosítójú szobát
 * 
 * @param {string} id 
 * @returns {Room}
 */
function getRoomById(id) {
    return elementStore.roomsById[id];
}

/**
 * Visszaadja a megadott azonosítójú szobák listáját.
 * 
 * @param {string[]} idList
 * @returns {Room[]}
*/
function getRoomsByIdList(idList) {
    return idList.map(id => elementStore.roomsById[id]).filter(x => x);
}