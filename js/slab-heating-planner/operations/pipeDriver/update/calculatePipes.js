/**
 * A paraméterül kapott csővezető csöveit kalkulálja ki.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function calculatePipes(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    const slabHeaterGroup = getSlabHeaterGroupById(pipeDriver.slabHeaterGroupId);
    const beginningPoints = calculatePipeBeginningPointsOfSlabHeaterGroup(slabHeaterGroup);
    const beginningOffset = getBeginningOffset(slabHeaterGroup.alignment);
    const nonMultipliedOffset = getNonMultipliedOffset(slabHeaterGroup.alignment);

    /** @type {Point[][]} */
    const pipes = [];
    for (let index = 0; index < beginningPoints.length; index++) {
        const firstPoint = beginningPoints[index];
        const offsetMultiplier = Math.abs(index - 0.5 * (beginningPoints.length - 1));
        const secondPoint = createPoint(firstPoint.x + beginningOffset.x * offsetMultiplier + nonMultipliedOffset.x, firstPoint.y + beginningOffset.y * offsetMultiplier + nonMultipliedOffset.y);
        const thirdPoint = getThirdPoint(pipeDriver, secondPoint, beginningPoints, index, slabHeaterGroup.alignment);

        const pipe = [firstPoint, secondPoint, thirdPoint];
        getPipePoints(pipeDriver, thirdPoint).forEach(p => pipe.push(p));

        pipes.push(pipe);
    }

    pipeDriver.pipes = pipes;
}

function getBeginningOffset(/** @type {Number} */ alignment) {
    const beginningOffset = PIPE_DRIVER_DISTANCE_BETWEEN_PIPES_IN_METERS * pixelsPerMetersRatio;
    const slabHeaterPipeOffset = TUBE_DISTANCE_IN_METER * pixelsPerMetersRatio / 1.5;
    if (alignment === 0) {
        return createPoint(-(beginningOffset), 0);
    } else if (alignment === 1) {
        return createPoint(0, -(beginningOffset));
    } else if (alignment === 2) {
        return createPoint((beginningOffset), 0);
    } else if (alignment === 3) {
        return createPoint(0, (beginningOffset));
    }
}

function getNonMultipliedOffset(/** @type {Number} */ alignment) {
    const slabHeaterPipeOffset = TUBE_DISTANCE_IN_METER * pixelsPerMetersRatio / 1.5;
    if (alignment === 0) {
        return createPoint(-(slabHeaterPipeOffset), 0);
    } else if (alignment === 1) {
        return createPoint(0, -(slabHeaterPipeOffset));
    } else if (alignment === 2) {
        return createPoint((slabHeaterPipeOffset), 0);
    } else if (alignment === 3) {
        return createPoint(0, (slabHeaterPipeOffset));
    }
}

function getThirdPoint(
    /** @type {PipeDriver} */
    pipeDriver,
    /** @type {Point} */
    secondPoint,
    /** @type {Point[]} */
    beginningPoints,
    /** @type {Number} */
    index,
    /** @type {Number} */
    alignment) {

    const indexOffset = (0.5 * (beginningPoints.length - 1) - index);
    const offset = pixelsPerMetersRatio * PIPE_DRIVER_DISTANCE_BETWEEN_PIPES_IN_METERS * indexOffset;
    const pipeDriverFirstPoint = pipeDriver.points[0];

    if (alignment === 0) {
        return createPoint(secondPoint.x, pipeDriverFirstPoint.y - offset);
    } else if (alignment === 1) {
        return createPoint(secondPoint.x - offset, pipeDriverFirstPoint.y);
    } else if (alignment === 2) {
        return createPoint(secondPoint.x, pipeDriverFirstPoint.y - offset);
    } else if (alignment === 3) {
        return createPoint(secondPoint.x - offset, pipeDriverFirstPoint.y);
    }
}

function getPipePoints(pipeDriver, pipeThirdPoint) {
    let startIndex = 0;
    let pipeLastPoint = pipeThirdPoint;
    let nextPoint = getNextPoint(pipeLastPoint, pipeDriver, startIndex);

    const points = [];
    while (nextPoint) {
        points.push(nextPoint);
        startIndex += 1;
        pipeLastPoint = nextPoint;
        nextPoint = getNextPoint(pipeLastPoint, pipeDriver, startIndex);
    }

    return points;
}

function getNextPoint(/** @type {Point} */ pipeLastPoint, /** @type {PipeDriver} */ pipeDriver, /** @type {Number} */ startIndex) {
    const points = pipeDriver.points;
    const length = points.length;

    const firstPoint = points[startIndex];
    const middlePoint = points[startIndex + 1];
    const lastPoint = points[startIndex + 2];
    
    if (lastPoint) {
        const firstDirection = getDirectionBetweenTwoPoints(firstPoint, middlePoint);
        const diagonal = defineDiagonal(firstPoint, middlePoint, lastPoint);
        return calculateIntersection(diagonal, pipeLastPoint, firstDirection);
    } else if (middlePoint) {
        const firstDirection = getDirectionBetweenTwoPoints(firstPoint, middlePoint);
        return calculateFinishingPoint(pipeLastPoint, firstDirection, firstPoint, middlePoint);
    } else {
        return undefined;
    }
}

function defineDiagonal(firstPoint, middlePoint, lastPoint) {
    const deltaX = lastPoint.x - firstPoint.x;
    const deltaY = lastPoint.y - firstPoint.y;

    const a = -1 * Math.sign(deltaX) * Math.sign(deltaY);
    return {
        a: a,
        b: middlePoint.y - middlePoint.x * a
    };
}

function calculateIntersection(diagonal, pipeLastPoint, firstDirection) {
    let x, y;
    if (firstDirection === DIRECTION_X) {
        y = pipeLastPoint.y;
        x = (y - diagonal.b) / diagonal.a;
    } else if (firstDirection === DIRECTION_Y) {
        x = pipeLastPoint.x;
        y = diagonal.a * x + diagonal.b;
    } else {
        throw new Error('Unexpected value of direction: ' + firstDirection);
    }

    return createPoint(x, y);
}

function calculateFinishingPoint(pipeLastPoint, firstDirection, firstPoint, middlePoint) {
    if (firstDirection === DIRECTION_X) {
        return createPoint(middlePoint.x, pipeLastPoint.y);
    } else if (firstDirection === DIRECTION_Y) {
        return createPoint(pipeLastPoint.x, middlePoint.y);
    } else {
        throw new Error('Unexpected value of direction: ' + firstDirection);
    }
}