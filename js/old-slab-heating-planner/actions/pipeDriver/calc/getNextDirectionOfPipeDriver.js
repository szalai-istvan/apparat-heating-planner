/**
 * A csővezető köetkező irányát adja meg (x, vagy y)
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {string} a következő irány
 */
function getLastDirectionOfPipeDriver(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    const points = pipeDriver.points;
    if (points.length < 2) {
        const slabHeaterGroup = getSlabHeaterGroupById(pipeDriver.slabHeaterGroupId);
        return slabHeaterGroup.alignment % 2 === 0 ? DIRECTION_Y : DIRECTION_X;
    }

    const lastPoint = points[points.length - 1];
    const secondToLastPoint = points[points.length - 2];

    return getDirectionBetweenTwoPoints(lastPoint, secondToLastPoint);
}