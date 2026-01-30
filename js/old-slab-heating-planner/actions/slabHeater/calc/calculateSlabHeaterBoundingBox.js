/**
 * Kiszámítja a födémfűtő elem befoglaló téglalpját.
 * 
 * @param {SlabHeater} slabHeater 
 * @returns {Rectangle}
 */
function calculateSlabHeaterBoundingBox(slabHeater) {
    const group = getSlabHeaterGroupById(slabHeater.groupId);
    return createRectangleByMiddlePoint(
        slabHeater.centerPosition, 
        group.lengthInPixels, 
        group.widthInPixels, 
        group.alignment * HALF_PI + toRadians(group.angleDeg)
    );
}

/**
 * Kiszámítja a panel szövegdobozát.
 * 
 * @param {SlabHeater} slabHeater 
 * @returns {Rectangle}
 */

function calculateSlabHeaterTextBox(slabHeater) {
    const group = getSlabHeaterGroupById(slabHeater.groupId);
    return createRectangleByMiddlePoint(
        slabHeater.centerPosition,
        slabHeaterTextboxWidthInPixels,
        slabHeaterTextboxHeightInPixels,
        group.alignment * HALF_PI + toRadians(group.angleDeg)
    );
}