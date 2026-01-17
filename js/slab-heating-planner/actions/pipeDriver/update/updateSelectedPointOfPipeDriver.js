/**
 * A paraméterül kapott csővezető kiválasztott pontját updateli
 * 
 * @param {PipeDriver} pipeDriver csővezető
 * @returns {undefined}
 */
function updateSelectedPointOfPipeDriver(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    if (!pipeDriver.isSelectedForDrag) {
        return;
    }

    const selectedIndex = pipeDriver.selectedPointIndex;
    const points = pipeDriver.points;
    const length = points.length;

    if (selectedIndex < 2) {
        return;
    }

    if (selectedIndex > length - 3) {
        return;
    }

    const previousPoint = createPoint(points[selectedIndex - 1].x, points[selectedIndex - 1].y);
    const originalPoint = createPoint(points[selectedIndex].x, points[selectedIndex].y);
    const nextPoint = createPoint(points[selectedIndex + 1].x, points[selectedIndex + 1].y);
    const newPoint = getClosestGridPointToCursorsCorrectedPosition();

    const threshold = 2 * GRID_RESOLUTION_METER * pixelsPerMetersRatio;
    if (calculateDistance(newPoint, previousPoint) < threshold || calculateDistance(newPoint, nextPoint) < threshold) {
        return;
    }

    const previousDirection = getDirectionBetweenTwoPoints(previousPoint, originalPoint);
    const nextDirection = getDirectionBetweenTwoPoints(originalPoint, nextPoint);
    
    if (previousDirection === DIRECTION_X) {
        points[selectedIndex - 1].y = newPoint.y;
        const newPreviousDirection = getDirectionBetweenTwoPoints(points[selectedIndex - 1], newPoint);
        if (newPreviousDirection !== previousDirection) {
            points[selectedIndex - 1].y = originalPoint.y;
            return;
        }
    } else if (previousDirection === DIRECTION_Y) {
        points[selectedIndex - 1].x = newPoint.x;
        const newPreviousDirection = getDirectionBetweenTwoPoints(points[selectedIndex - 1], newPoint);
        if (newPreviousDirection !== previousDirection) {
            points[selectedIndex - 1].x = originalPoint.x;
            return;
        }
    }

    if (nextDirection === DIRECTION_X) {
        points[selectedIndex + 1].y = newPoint.y;
        const newNextDirection = getDirectionBetweenTwoPoints(newPoint, points[selectedIndex + 1]);
        if (nextDirection !== newNextDirection) {
            points[selectedIndex + 1].y = originalPoint.y;
        }
    } else if (nextDirection === DIRECTION_Y) {
        points[selectedIndex + 1].x = newPoint.x;
        const newNextDirection = getDirectionBetweenTwoPoints(newPoint, points[selectedIndex + 1]);
        if (nextDirection !== newNextDirection) {
            points[selectedIndex + 1].x = originalPoint.x;
        }
    }

    points[selectedIndex] = newPoint;

    for (let index = 0; index < points.length - 1; index++) {
        const direction = getDirectionBetweenTwoPoints(points[index], points[index + 1]);
        if (!direction) {
            points[selectedIndex - 1] = previousPoint;
            points[selectedIndex] = originalPoint;
            points[selectedIndex + 1] = nextPoint;
        }
    }
}