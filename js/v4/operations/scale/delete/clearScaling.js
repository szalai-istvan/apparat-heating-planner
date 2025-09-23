/**
 * Resetteli a scaler adatokat
 * 
 * @returns {undefined}
 */
function clearScaling() {
    scalingFirstPoint = null;
    scalingSecondPoint = null;
    pixelsPerMetersRatio = null;
    updateGridResolution();
    clearRooms();
}