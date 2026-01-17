/**
 * Eltávolítja a legutolsó dobozt a kiválasztott csoportból
 * 
 * @returns {undefined}
 */
function removeLastBoxFromSelectedGroup() {
    const selectedGroup = selectedBoxGroup;
    if (!selectedGroup) {
        return;
    }

    if (selectedGroup.boxIds.length < 2) {
        return;
    }

    const boxes = getBoxesByIdList(selectedGroup.boxIds);
    const box = boxes[boxes.length - 1];
    detachBoxFromGroup(box);
    elementStore.remove(box);

    updateBoxGroupPipeDriverEndNodePosition(selectedGroup);
    resetPipeDriver(getPipeDriverById(selectedGroup.pipeDriverId));
}