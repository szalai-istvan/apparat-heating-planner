/**
 * Törli a kiválasztott födémfűtő csoportot
 * 
 * @returns {undefined}
 */
function removeSelectedSlabHeaterGroup() {
    const slabHeaterGroup = selectedSlabHeaterGroup;
    
    if (slabHeaterGroup) {
        elementStore.remove(slabHeaterGroup);
        selectedSlabHeaterGroup = null;
        const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);
        slabHeaters.forEach(sh => elementStore.remove(sh));
        elementStore.remove(getPipeDriverById(slabHeaterGroup.pipeDriverId));
    }
}