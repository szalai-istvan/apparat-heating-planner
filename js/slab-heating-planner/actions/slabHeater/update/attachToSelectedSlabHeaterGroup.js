/**
 * Hozzácsatolja a paraméterül kapott födémfűtő elemet a kiválasztott csoporthoz
 * 
 * @param {SlabHeater} slabHeater födémfűtő
 * @returns {undefined}
 */
function attachToSelectedSlabHeaterGroup(slabHeater) {
    checkClass(slabHeater, CLASS_SLAB_HEATER);

    const selectedGroup = selectedSlabHeaterGroup;
    if (!selectedGroup) {
        return;
    }

    slabHeater.groupId = selectedGroup.id;
    selectedGroup.slabHeaterIds.push(slabHeater.id);
}