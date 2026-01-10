let scalingFirstPoint = null;
let scalingSecondPoint = null;

/**
 * A kurzor pillanatnyi abszolút pozícióját hozzáadja a scaler-hez
 * 
 * @returns {undefined}
 */
function addScalingReferencePoint() {
    if (!scalingInProgress) {
        return;
    }

    const point = getCorrectedMousePositionAbsolute();
    if (!scalingFirstPoint) {
        scalingFirstPoint = point;
    } else if (!scalingSecondPoint) {
        scalingSecondPoint = point;
        showScalingDialog();
    }
}