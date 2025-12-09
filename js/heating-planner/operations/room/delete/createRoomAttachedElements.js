/**
 * Törli az összes szobákhoz csatolt objektumokat.
 * 
 * @returns {undefined}
 */
function clearRoomAttachedElements() {
    elementStore.structureElements = [];
    elementStore.structureElementsById = {};
}
