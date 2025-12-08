/**
 * Megkíséreli megszüntetni a csővezető objektum kijelölését, visszaadja az eredményt.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectPipeDriver() {
    const pipeDriver = selectedPipeDriver;
    if (!pipeDriver) {
        return true;
    }

    if (!selectedPipeDriverIsFullyConfigured()) {
        return false;
    }

    removeUnnecessaryPointsOfPipeDriver(pipeDriver);
    pipeDriver.isSelected = false;
    pipeDriver.isSelectedForDrag = false;
    pipeDriver.selectedPointIndex = null;
    selectedPipeDriver = null;

    return true;
}