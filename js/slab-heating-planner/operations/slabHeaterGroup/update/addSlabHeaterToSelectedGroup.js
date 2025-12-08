/**
 * Hozzáad egy födémfűtő panelt a kiválasztott csoporthoz
 * 
 * @returns {undefined}
 */
function addSlabHeaterToSelectedGroup() {
    const selectedGroup = selectedSlabHeaterGroup;
    if (!selectedGroup) {
        return;
    }

    const nextPosition = nextSlabHeaterPosition(selectedGroup);
    const slabHeater = createSlabHeater(true);
    slabHeater.centerPosition = nextPosition;

    const newMemberIsValid = selectedGroup.isSelectedForDrag || validateSlabHeaterGroupPositionAndGetContainingRoom(selectedGroup);
    if (!newMemberIsValid) {
        displayMessage('A hozzáadni kívánt elem része vagy egésze szobán kívülre kerülne!');
        removeLastSlabHeaterFromSelectedGroup();
        return;
    }

    const pipeDriver = getPipeDriverById(selectedGroup.pipeDriverId);
    const firstPoint = calculatePipeDriverFirstPoint(selectedGroup);
    updatePipeDriverFirstPoint(pipeDriver, firstPoint);
    resetPipeDriver(pipeDriver);
}

function nextSlabHeaterPosition(group) {
    const slabHeaters = getSlabHeatersByIdList(group.slabHeaterIds);
    const lastSlabHeater = slabHeaters[slabHeaters.length - 1];
    const lastCenter = lastSlabHeater.centerPosition;
    const width = group.width;
    const horizontal = slabHeaterGroupIsHorizontal(group);

    const x = lastCenter.x + horizontal * width * pixelsPerMetersRatio;
    const y = lastCenter.y + (1 - horizontal) * width * pixelsPerMetersRatio;
    return createPoint(x, y);
}