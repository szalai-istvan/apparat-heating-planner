/**
 * Szobák törlése utáni projektspecifikus műveletek
 * 
 * @returns {undefined}
 */
function onRoomsClearedSlabHeatingPlanner() {
    clearSlabHeaterGroups();
}

registerEventListener(ROOMS_CLEARED, onRoomsClearedSlabHeatingPlanner);