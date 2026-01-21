/**
 * Megváltoztatja a kiválasztott födémfűtő csoport méreteit az oldalsó menü értékei alapján
 * 
 * @returns {undefined}
 */
function updateSelectedSlabHeaterGroupDimensions() {
    const selectedGroup = selectedSlabHeaterGroup;
    if (!selectedGroup) {
        return;
    }

    const width = slabHeaterWidthOptionsBar.getValue();
    const length = slabHeaterLengthOptionsBar.getValue();

    if ((!width) || (!length)) {
        return;
    }

    const originalWidth = selectedGroup.width;
    const originalLength = selectedGroup.length;
    selectedGroup.width = width;
    selectedGroup.length = length;
    updateSlabHeaterGroupMemberPosition(selectedGroup);

    const slabHeaters = getSlabHeatersByIdList(selectedGroup.slabHeaterIds);
    let newDimensionsArealid;
    if (selectedGroup.isSelectedForDrag || !(slabHeaters[0].centerPosition)) {
        newDimensionsArealid = true;
    } else {
        newDimensionsArealid = validateSlabHeaterGroupPositionAndGetContainingRoom(selectedGroup);
    }

    if (!newDimensionsArealid) {
        displayMessage('A kiválasztott födémfűtő csoport része vagy egésze szobán kívülre kerülne az átméretezés hatására!');
        selectedGroup.width = originalWidth;
        selectedGroup.length = originalLength;
        setOptionBarValues(selectedGroup);
        updateSlabHeaterGroupMemberPosition(selectedGroup);
    } else {
        updateSlabHeaterGroupType(selectedGroup);
        const firstPoint = calculatePipeDriverFirstPoint(selectedGroup);
        const pipeDriver = getPipeDriverById(selectedGroup.pipeDriverId);
        updatePipeDriverFirstPoint(pipeDriver, firstPoint);
    }
}