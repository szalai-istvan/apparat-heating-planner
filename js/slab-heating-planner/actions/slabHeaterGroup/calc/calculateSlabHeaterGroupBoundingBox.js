/**
 * Kiszámítja a födémfűtő csoport befoglaló téglalapját és visszaadja.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {Rectangle}
 */
function calculateSlabHeaterGroupBoundingBox(slabHeaterGroup) {
    const middlePoint = createPoint(0, 0);

    const firstSlabHeater = getSlabHeaterById(slabHeaterGroup.slabHeaterIds[0]);
    const lastSlabHeater = getSlabHeaterById(slabHeaterGroup.slabHeaterIds[slabHeaterGroup.slabHeaterIds.length - 1]);
    
    if (!firstSlabHeater || !lastSlabHeater) {
        return undefined;
    }

    middlePoint.x = (firstSlabHeater.centerPosition.x + lastSlabHeater.centerPosition.x) / 2;
    middlePoint.y = (firstSlabHeater.centerPosition.y + lastSlabHeater.centerPosition.y) / 2;

    return createRectangleByMiddlePoint(
        middlePoint, 
        slabHeaterGroup.lengthInPixels, 
        slabHeaterGroup.widthInPixels * slabHeaterGroup.slabHeaterIds.length,
        slabHeaterGroup.alignment * HALF_PI + toRadians(slabHeaterGroup.angleDeg)
    );
}