/**
 * Frissíti a csővezető objektum első pontját
 * 
 * @param {PipeDriver} pipeDriver csővezető
 * @param {Point} firstPoint első pont
 * @returns {undefined}
 */
function updatePipeDriverFirstPoint(pipeDriver, firstPoint) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);
    checkClass(firstPoint, CLASS_POINT, true);

    if (!firstPoint) {
        return;
    }

    const points = pipeDriver.points;
    if (points.length === 0) {
        points.push(firstPoint);
        return;
    }

    if (points.length === 1) {
        points[0] = firstPoint;
        return;
    }

    if (points.some(p => calculateDistance(p, firstPoint) < 0.9 * GRID_RESOLUTION_METER * pixelsPerMetersRatio)) {
        return;
    }

    const secondPoint = points[1];
    if (!secondPoint) { 
        return;
    }

    const originalFirstPoint = createPoint(points[0].x, points[0].y);
    const originalSecondPoint = createPoint(points[1].x, points[1].y);

    
    const originalDirection = getDirectionBetweenTwoPoints(originalFirstPoint, secondPoint);
    if (originalDirection === DIRECTION_X) {
        points[0] = firstPoint;
        secondPoint.y = firstPoint.y;
    } else if (originalDirection === DIRECTION_Y) {
        points[0] = firstPoint;
        secondPoint.x = firstPoint.x;
    }

    const direction = getDirectionBetweenTwoPoints(firstPoint, secondPoint);
    if (direction !== originalDirection) {
        points[0] = originalFirstPoint;
        points[1] = originalSecondPoint;
    }
}
