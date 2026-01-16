/**
 * Betölti a födémfűtő csoportokat, és visszaadja a kiválasztottat.
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {SlabHeaterGroup} A kiválasztott födémfűtő csoport
 */
function loadSlabHeaters(projectState) {
    const slabHeaters = projectState.slabHeaters.slabHeaters || [];
    for (let slabHeater of slabHeaters) {
        slabHeater.constructor = { name: CLASS_SLAB_HEATER };
        elementStore.register(slabHeater);
    }

    const slabHeaterGroups = projectState.slabHeaterGroups.slabHeaterGroups || [];
    for (let slabHeaterGroup of slabHeaterGroups) {
        slabHeaterGroup.constructor = { name: CLASS_SLAB_HEATER_GROUP };
        elementStore.register(slabHeaterGroup);
    }

    return slabHeaterGroups.filter(shg => shg.isSelected)[0];
}

/**
 * Betölti a födémáttöréseket, és visszaadja a kiválasztottat
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {BoxGroup} A kiválasztott dobozcsoport
 */
function loadBoxes(projectState) {
    const boxes = projectState.boxes.boxes || [];
    for (let box of boxes) {
        box.constructor = { name: CLASS_BOX };
        elementStore.register(box);
    }

    const boxGroups = projectState.boxGroups.boxGroups || [];
    for (let boxGroup of boxGroups) {
        boxGroup.constructor = { name: CLASS_BOX_GROUP };
        elementStore.register(boxGroup);
    }

    return boxGroups.filter(bg => bg.isSelected)[0];
}

/**
 * Betölti a csőnyomvonalakat, és visszaadja a kiválasztottat.
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {PipeDriver} A kiválasztott csőnyomvonal
 */
function loadPipeDrivers(projectState) {
    const pipeDrivers = projectState.pipeDrivers.pipeDrivers || [];

    for (let pipeDriver of pipeDrivers) {
        pipeDriver.constructor = { name: CLASS_PIPE_DRIVER };
        elementStore.register(pipeDriver);
        recalculatePipeDriverConfiguration(pipeDriver);
    }

    return pipeDrivers.filter(pd => pd.isSelected)[0];
}

function recalculatePipeDriverConfiguration(pipeDriver) {
    const boxGroup = getBoxGroupWithEndNodeAtPipeDriversLastPoint(pipeDriver);
    if (boxGroup) {
        boxGroup.pipeDriverId = pipeDriver.id;
        pipeDriver.isFullyConfigured = true;
    }
}

// todo ezek setup lépések
registerProjectSpecificLoadingStep(loadSlabHeaters);
registerProjectSpecificLoadingStep(loadBoxes);
registerProjectSpecificLoadingStep(loadPipeDrivers);