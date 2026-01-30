/**
 * Hozzáadja a következő pontot a kiválasztott csővezető objektumhoz
 * 
 * @returns {undefined}
 */
function addPointToSelectedPipeDriver() {
    const pipeDriver = selectedPipeDriver;
    if (!pipeDriver) {
        return;
    }

    if (selectedPipeDriverIsFullyConfigured()) {
        return;
    }

    const nextPoint = getNextPointToAddToPipeDriver(pipeDriver);
    const validationResult = validateNextPointOfPipeDriver(pipeDriver, nextPoint);
    if (validationResult === VALIDATION_OK) {
        pipeDriver.points.push(nextPoint);
    } else if (validationResult === VALIDATION_TOO_SHORT) {
        displayMessage('Túl rövid nyomvonal szakasz! Kérem helyezze távolabb!');
    } else if (validationResult === VALIDATION_BAD_LAYOUT) {
        displayMessage('A megadott pont hozzáadása átfedést okozna a csövek között! Kérem helyezze máshová!');
    }
}