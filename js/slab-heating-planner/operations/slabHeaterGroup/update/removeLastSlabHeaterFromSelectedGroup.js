/**
 * Eltávolítja a legutolsó födémfűtő elemet a kiválasztott csoportból
 * 
 * @returns {undefined}
 */
function removeLastSlabHeaterFromSelectedGroup() {
    const slabHeaterGroup = selectedSlabHeaterGroup;
    if (!slabHeaterGroup) {
        return;
    }

    const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);
    if (slabHeaters.length < 2) {
        return;
    }

    const lastSlabHeater = slabHeaters[slabHeaters.length - 1];
    detachSlabHeaterFromGroup(lastSlabHeater);
    elementStore.remove(lastSlabHeater);

    const pipeDriver = getPipeDriverById(slabHeaterGroup.pipeDriverId);
    const firstPoint = calculatePipeDriverFirstPoint(slabHeaterGroup);
    updatePipeDriverFirstPoint(pipeDriver, firstPoint);
    resetPipeDriver(pipeDriver);
}