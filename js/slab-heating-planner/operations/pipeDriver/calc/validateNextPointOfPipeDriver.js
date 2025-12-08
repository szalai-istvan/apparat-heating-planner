/**
 * Validálja a csővezető következő pontját
 * 
 * @param {PipeDriver} pipeDriver 
 * @param {Point} nextPoint 
 * @returns {string} validáció eredménye
 */
function validateNextPointOfPipeDriver(pipeDriver, nextPoint) {
    const points = pipeDriver.points;
    const lastPoint = points[points.length - 1];
    const slabHeaterGroup = getSlabHeaterGroupById(pipeDriver.slabHeaterGroupId);

    const minimumDistance = 2 * PIPE_DRIVER_DISTANCE_BETWEEN_PIPES_IN_METERS * slabHeaterGroup.slabHeaterIds.length * pixelsPerMetersRatio;
    for (let point of points) {
        if (point === lastPoint) {
            continue;
        }
        const distanceFromPoint = calculateDistance(point, nextPoint);
        if (distanceFromPoint < minimumDistance) {
            return VALIDATION_TOO_SHORT;
        }
    }

    if (points.length < 3) {
        return VALIDATION_OK;
    }

    const secondToLastPoint = points[points.length - 2];
    if (calculateDistance(lastPoint, secondToLastPoint) < minimumDistance) {
        const thirdToLastPoint = points[points.length - 3];

        const nextDeltaX = nextPoint.x - lastPoint.x;
        const deltaX = secondToLastPoint.x - thirdToLastPoint.x;
        const dx = deltaX * nextDeltaX;
        
        const nextDeltaY = nextPoint.y - lastPoint.y;
        const deltaY = secondToLastPoint.y - thirdToLastPoint.y;
        const dy = deltaY * nextDeltaY;

        if (dx < 0 || dy < 0) {
            return VALIDATION_BAD_LAYOUT;
        }
    }

    return VALIDATION_OK;
}