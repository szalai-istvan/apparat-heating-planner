/**
 * A paraméterül kapott alapállapotba állítja vissza
 * 
 * @param {PipeDriver} pipeDriver csővezető
 * @returns {undefined}
 */
function resetPipeDriver(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER, true);

    if (!pipeDriver) {
        return;
    }

    elementStore.boxGroups.filter(bg => bg.pipeDriverId === pipeDriver.id).forEach(bg => bg.pipeDriverId = null);

    forceDeselectPipeDriver(pipeDriver);
    pipeDriver.points = [pipeDriver.points[0]];
    pipeDriver.pipes = [];
    pipeDriver.isFullyConfigured = false;
    updatePipeLengthLabel(pipeDriver);
}


function forceDeselectPipeDriver(pipeDriver = undefined) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER, true);

    pipeDriver = pipeDriver || selectedPipeDriver;
    if (!pipeDriver) {
        return true;
    }

    pipeDriver.isSelected = false;
    pipeDriver.isSelectedForDrag = false;
    pipeDriver.selectedPointIndex = null;
    selectedPipeDriver = null;
    updatePipeLengthLabel(pipeDriver);
}