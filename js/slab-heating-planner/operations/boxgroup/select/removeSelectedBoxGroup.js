/**
 * Törli a kiválasztott doboz csoportot
 * 
 * @returns {undefined}
 */
function removeSelectedBoxGroup() {
    const boxGroup = selectedBoxGroup;

    if (boxGroup) {
        elementStore.remove(boxGroup);
        selectedBoxGroup = null;
        getBoxesByIdList(boxGroup.boxIds).forEach(b => elementStore.remove(b));
        resetPipeDriver(getPipeDriverById(boxGroup.pipeDriverId));
    }
}