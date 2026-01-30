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

    refreshCenterPositionOfSlabHeater(slabHeater, selectedGroup);
}

/**
 * Kiszámítja a helyes pozícióját a csoporthoz csatolt födémfűtő elemnek.
 * 
 * @param {SlabHeater} slabHeater 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * 
 * @returns {undefined}
 */
function refreshCenterPositionOfSlabHeater(slabHeater, slabHeaterGroup) {
    const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);
    const firstCenterPosition = slabHeaters[0].centerPosition;

    slabHeater.centerPosition = offsetSlabHeaterCenterPosition({
        originalCenter: firstCenterPosition,
        width: slabHeaterGroup.width,
        alignment: slabHeaterGroup.alignment,
        index: slabHeaters.length - 1
    });
    slabHeater.boundingBox = calculateSlabHeaterBoundingBox(slabHeater);
    slabHeater.textBox = calculateSlabHeaterTextBox(slabHeater);
}