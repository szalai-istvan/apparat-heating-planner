/**
 * Kiüríti a kiválasztásra cachelt csővezetőt
 * 
 * @param {PipeDriver} pipeDriver csővezető paraméter
 * @returns {undefined}
 */
function clearPipeDriverSelectionCache(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    pipeDriver.selectedPointIndexCache = null;
    pipeDriver.cursorIsInsidePointIndexCache = null;
}