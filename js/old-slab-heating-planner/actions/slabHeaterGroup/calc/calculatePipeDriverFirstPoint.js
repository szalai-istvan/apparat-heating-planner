/**
 * Kiszámolja a paraméterül kapott födém fűtő csoporthoz rendelhető csővezető kezdőpontját
 * 
 * @param {SlabHeaterGroup} SlabHeaterGroup a csoport paraméter
 */
function calculatePipeDriverFirstPoint(slabHeaterGroup) {
    checkClass(slabHeaterGroup, CLASS_SLAB_HEATER_GROUP);

    const ratio = pixelsPerMetersRatio;
    const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);
    const firstSlabHeater = slabHeaters[0];
    if (!firstSlabHeater) {
        return undefined;
    }

    const firstCenterPoint = firstSlabHeater.centerPosition;
    if (!firstCenterPoint) {
        return undefined;
    }

    const width = slabHeaterGroup.width * ratio;
    const length = slabHeaterGroup.length * ratio;
    const additionalOffset = pipeDriverAdditionalOffsetSHGInPixels;
    const widthOffset = (slabHeaters.length - 1) * width / 2;
    const lengthOffset = length / 2 + additionalOffset;

    if (slabHeaterGroup.alignment % 2 === 0) {
        const factor = Math.sign(slabHeaterGroup.alignment - 1);
        return createPoint(firstCenterPoint.x + factor * lengthOffset, firstCenterPoint.y + widthOffset);
    } else {
        const factor = Math.sign(slabHeaterGroup.alignment - 2);
        return createPoint(firstCenterPoint.x + widthOffset, firstCenterPoint.y + factor * lengthOffset);
    }
}