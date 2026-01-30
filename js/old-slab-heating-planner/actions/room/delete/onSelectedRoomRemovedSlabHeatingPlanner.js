/**
 * Kiválasztott szoba törlése utáni műveletek
 * 
 * @param {Room} room, eltávolított szoba.
 * @returns {undefined}
 */
function onSelectedRoomRemovedSlabHeatingPlanner(room) {
    const slabHeaterGroupsToDelete = elementStore.slabHeaterGroups.filter(shg => shg.roomId === room.id);
    
    const slabHeatersToDelete = [];
    for (let slabHeaterGroup of slabHeaterGroupsToDelete) {
        for (let slabHeater of slabHeaterGroup.slabHeaters) {
            slabHeatersToDelete.push(slabHeater);
        }
    }

    slabHeatersToDelete.forEach(sh => elementStore.remove(sh));
    slabHeaterGroupsToDelete.forEach(shg => elementStore.remove(shg));
}