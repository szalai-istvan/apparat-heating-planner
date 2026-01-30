/**
 * Felrajzolja a rajzlapra a paraméterül kapott födémfűtő csoportot
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup födémfűtő csoport
 * @returns {undefined}
 */
function drawSlabHeaterGroup(slabHeaterGroup) {
    checkClass(slabHeaterGroup, CLASS_SLAB_HEATER_GROUP);

    
    const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);
    const pipeDriver = getPipeDriverById(slabHeaterGroup.pipeDriverId);
    if (slabHeaterGroup.isSelectedForDrag) {
        slabHeaterGroup.boundingBox = calculateSlabHeaterGroupBoundingBox(slabHeaterGroup);
        updateSlabHeaterGroupMemberPosition(slabHeaterGroup);

        if (pipeDriver) {
            const firstPoint = calculatePipeDriverFirstPoint(slabHeaterGroup);
            updatePipeDriverFirstPoint(pipeDriver, firstPoint);
        }
    }

    slabHeaters.forEach(sh => drawSlabHeater(sh));
    if (pipeDriver) {
        calculatePipes(pipeDriver);
        drawPipeDriver(pipeDriver);
    }
}