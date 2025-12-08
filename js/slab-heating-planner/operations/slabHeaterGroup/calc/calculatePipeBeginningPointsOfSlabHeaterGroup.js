/**
 * Kiszámolja és visszaadja a paraméterül kapott födémfűtő csoport cső kezdőpontjainak listáját.
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup födémfűtő csoport
 * @param {Point[]} A kezdőpontokat tartalmazó array
 */
function calculatePipeBeginningPointsOfSlabHeaterGroup(slabHeaterGroup) {
    checkClass(slabHeaterGroup, CLASS_SLAB_HEATER_GROUP);

    const alignment = slabHeaterGroup.alignment;
    const length = slabHeaterGroup.length;
    const width = slabHeaterGroup.width - TUBE_DISTANCE_IN_METER;
    const slabHeaters = getSlabHeatersByIdList(slabHeaterGroup.slabHeaterIds);

    const direction = Math.sign(alignment - 1 - (alignment % 2));

    let deltaX, deltaY;
    if (alignment % 2 === 0) {
        deltaX = [pixelsPerMetersRatio * direction * length / 2];
        deltaY = [pixelsPerMetersRatio * -1 * width / 2, pixelsPerMetersRatio * width / 2];
    } else {
        deltaX = [pixelsPerMetersRatio * -1 * width / 2, pixelsPerMetersRatio * width / 2];
        deltaY = [pixelsPerMetersRatio * direction * length / 2];
    }

    /** @type {Point[]} */
    const points = [];
    for (let slabHeater of slabHeaters) {
        const centerPoint = slabHeater.centerPosition;
        for (let x of deltaX) {
            for (let y of deltaY) {
                points.push(createPoint(centerPoint.x + x, centerPoint.y + y));
            }
        }
    }

    return points;
}