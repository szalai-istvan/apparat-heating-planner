/**
 * A paraméterül kapott födémfűtő csoport elemeinek újrakalkulálja a pozícióját
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup csoport
 * @returns {undefined}
 */
function updateSlabHeaterGroupMemberPosition(slabHeaterGroup) {
    const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);
    const first = slabHeaters[0];
    const firstCenterPosition = slabHeaterGroup.isSelectedForDrag ? calculateSlabHeaterCenterPositionWithCorrection(first, slabHeaterGroup.width, slabHeaterGroup.length) : first.centerPosition;

    for (let index = 0; index < slabHeaters.length; index++) {
        slabHeaters[index].centerPosition = offsetSlabHeaterCenterPosition({
            originalCenter: firstCenterPosition,
            width: slabHeaterGroup.width,
            alignment: slabHeaterGroup.alignment,
            index: index - (slabHeaterGroup.clickedMemberIndex || 0)
        });
        slabHeaters[index].boundingBox = calculateSlabHeaterBoundingBox(slabHeaters[index]);
        slabHeaters[index].textBox = calculateSlabHeaterTextBox(slabHeaters[index]);
    }
}