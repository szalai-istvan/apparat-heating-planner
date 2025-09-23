let pixelsPerMetersRatio = null;

/**
 * Kiszámolja és beállítja a scaling értékeket
 * 
 * @param {string} scalingValue a felhasználó által megadott hosszúság érték
 */
function processScalingValue(scalingValue) {
    checkClass(scalingValue, CLASS_STRING);

    const firstPoint = scalingFirstPoint;
    const secondPoint = scalingSecondPoint;

    const scalingValueNumber = Number(scalingValue);
    if (scalingValueNumber > 0) {
        const referenceLength = scalingValueNumber;
        scalingInProgress = false;
        const referencePointDistance = calculateDistance(firstPoint, secondPoint);
        pixelsPerMetersRatio = roundNumber(referencePointDistance / referenceLength, 2);
        updateGridResolution();
        updateRenderSizeValues();

        scalingDialog.close();
        toggleScreenControls();
    } else {
        displayMessage('Érvénytelen méretarány. Csak pozitív szám adható meg!');
    }
}