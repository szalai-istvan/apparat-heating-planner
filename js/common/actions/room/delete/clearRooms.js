/**
 * Törli az összes létrehozott szobát
 * 
 * @returns {undefined}
 */
function clearRooms() {
    elementStore.rooms = [];
    elementStore.roomsById = {};
    
    deselectRoom();

    dispatchCustomEvent(ROOMS_CLEARED, {});
}