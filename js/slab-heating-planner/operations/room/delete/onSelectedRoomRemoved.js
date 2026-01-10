//Project-specific

/**
 * Kiválasztott szoba törlése utáni műveletek
 * 
 * @returns {undefined}
 */
function onSelectedRoomRemoved() { //Project-specific
    removeSlabHeatersFromDeletedRoom(room);
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