/**
 * Törli a kiválasztott szobát és a benne található födémfűtő csoportokat.
 * 
 * @returns {undefined}
 */
function removeSelectedRoom() {
    const room = selectedRoom;
    if (room) {
        elementStore.remove(room);
        selectedRoom = null;
        giveBackSlabHeaterColor(room.slabHeaterColor);
    }

    removeSlabHeatersFromDeletedRoom(room);

    deselectObject();
    if (elementStore.rooms.length === 0) {
        removeGridSeed();
    }
}

function removeSlabHeatersFromDeletedRoom(room) {
    const slabHeaterGroupsToDelete = elementStore.slabHeaterGroups.filter(shg => shg.room === room);
    
    const slabHeatersToDelete = [];
    for (let slabHeaterGroup of slabHeaterGroupsToDelete) {
        for (let slabHeater of slabHeaterGroup.slabHeaters) {
            slabHeatersToDelete.push(slabHeater);
        }
    }

    slabHeatersToDelete.forEach(sh => elementStore.remove(sh));
    slabHeaterGroupsToDelete.forEach(shg => elementStore.remove(shg));
}