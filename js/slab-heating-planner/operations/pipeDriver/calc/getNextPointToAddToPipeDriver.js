/**
 * Kiszámolja a csővezetőhöz hozzáadható következő pontot.
 * 
 * @param {PipeDriver} pipeDriver csővezető paraméter
 * @returns {Point} a hozzáadható pont
 */
function getNextPointToAddToPipeDriver(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    const points = pipeDriver.points;

    if (points.length === 1) {
        return getSecondPointOfPipeDriver(pipeDriver);
    }

    const direction = getLastDirectionOfPipeDriver(pipeDriver);
    const lastPoint = points[points.length - 1];
    const nextPoint = getClosestGridPointToCursorsCorrectedPosition();

    if (direction === DIRECTION_Y) {
        nextPoint.y = lastPoint.y;
    } else if (direction === DIRECTION_X) {
        nextPoint.x = lastPoint.x;
    }

    return nextPoint;
}

function getSecondPointOfPipeDriver(/** @type {PipeDriver} */ pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    const slabHeaterGroup = getSlabHeaterGroupById(pipeDriver.slabHeaterGroupId);
    const alignment = slabHeaterGroup.alignment;
    const firstPoint = pipeDriver.points[0];
    const minimumOffset = PIPE_LENGTH_FIRST_SEGMENT_MINIMUM_LENGTH_IN_METERS * pixelsPerMetersRatio;
    const mousePosition = getClosestGridPointToCursorsCorrectedPosition();

    let x, y;
    switch (alignment) {
        case 0:
            x = Math.min(firstPoint.x - minimumOffset, mousePosition.x);
            y = firstPoint.y;
            break;
        case 1:
            x = firstPoint.x;
            y = Math.min(firstPoint.y - minimumOffset, mousePosition.y);
            break;
        case 2:
            x = Math.max(firstPoint.x + minimumOffset, mousePosition.x);
            y = firstPoint.y;
            break;
        case 3:
            x = firstPoint.x;
            y = Math.max(firstPoint.y + minimumOffset, mousePosition.y);
            break;
    }

    return createPoint(x, y);
}