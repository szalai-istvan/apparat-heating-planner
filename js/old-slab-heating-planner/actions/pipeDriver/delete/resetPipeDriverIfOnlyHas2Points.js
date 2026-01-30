/**
 * A paraméterül kapott csővezető objektumot resetteli amennyiben 3-nál kevesebb pontból áll
 * 
 * @param {PipeDriver} pipeDriver csővezető objektum
 * @returns {undefined}
 */
function resetPipeDriverIfOnlyHas2Points(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER, true);

    if (!pipeDriver) {
        return;
    }

    const points = pipeDriver.points;
    if (!points) {
        return;
    }

    if (points.length > 2) {
        return;
    }

    resetPipeDriver(pipeDriver);
    updatePipeLengthLabel(pipeDriver);
}