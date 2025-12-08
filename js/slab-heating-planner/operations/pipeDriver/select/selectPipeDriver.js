/** @type {PipeDriver} */
let selectedPipeDriver = null;
/** @type {PipeDriver} */
let cachedSelectablePipeDriver = null;

/**
 * Megkeresi, kiválasztja és visszaadja a kiválasztható csővezetőt
 * 
 * @param {PipeDriver} pipeDriver csővezető paraméter
 * @returns {PipeDriver} a kiválasztott csővezető
 */
function selectPipeDriver(pipeDriver = undefined) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER, true);

    pipeDriver = pipeDriver || checkForSelectablePipeDriver();
    if (!pipeDriver) {
        return;
    }

    if (pipeDriver === selectedPipeDriver) {
        pipeDriver.isSelected = true;
        pipeDriver.isSelectedForDrag = true;
        setSelectedPipeDriverPointIndex(pipeDriver);
        return pipeDriver;
    }

    if (deselectObject()) {
        pipeDriver.isSelected = true;
        selectedPipeDriver = pipeDriver;
        return pipeDriver;
    }

    return undefined;
}

function checkForSelectablePipeDriver() {
    if (cachedSelectablePipeDriver) {
        return cachedSelectablePipeDriver;
    }

    const selection = elementStore.pipeDrivers.filter(pd => mouseCursorIsInsidePipeDriversPoint(pd));
    const pipeDriver = selection[0];
    if (pipeDriver) {
        cachedSelectablePipeDriver = pipeDriver;
        return pipeDriver;
    }
    return undefined;
}

function setSelectedPipeDriverPointIndex(pipeDriver) {
    pipeDriver.selectedPointIndex = pipeDriver.selectedPointIndexCache;
}