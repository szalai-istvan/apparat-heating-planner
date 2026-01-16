/**
 * Szobák törlése utáni projektspecifikus műveletek
 * 
 * @returns {undefined}
 */
function onRoomsClearedHeatingPlanner() {
    elementStore.structureElements = [];
    elementStore.structureElementsById = {};

    clearPanelGroups();
}

registerEventListener(ROOMS_CLEARED, onRoomsClearedHeatingPlanner);