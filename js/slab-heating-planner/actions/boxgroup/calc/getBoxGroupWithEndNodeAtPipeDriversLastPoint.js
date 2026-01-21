/**
 * Megkeresi a dobozcsoportot, amelynek a cső vég node-ja a kurzor közelében van
 * 
 * @param {PipeDriver} pipeDriver csővezető
 * @returns {BoxGroup} A feltételnek megfelelő dobozcsoport
 */
function getBoxGroupWithEndNodeAtPipeDriversLastPoint(pipeDriver) {
    
    const boxGroups = elementStore.boxGroups;
    const points = pipeDriver.points;
    if (points.length < 2) {
        return null;
    }
    const point = points[points.length - 1];
    const threshold = gridResolutionPixel;

    const boxGroupsFiltered = boxGroups.filter(bg => calculateDistance(bg.pipeDriverEndNodeCoordinates, point) < 2 * threshold);

    return boxGroupsFiltered[0];
}