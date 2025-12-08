/**
 * Egy paraméterül kapott csővezető duplikált pontjait távolítja el.
 * 
 * @param {PipeDriver} pipeDriver csővezető
 */
function removeUnnecessaryPointsOfPipeDriver(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    let points = [...pipeDriver.points];
    for (let i = 0; i < points.length; i++) {
        const pi = points[i];
        if (!pi) {
            continue;
        }

        for (let j = i + 1; j < points.length; j++) {
            const pj = points[j];

            if (!pi) {
                continue;
            }
            if (!pj) {
                continue;
            }

            if (roundNumber(pi.x - pj.x, 2) === 0 && roundNumber(pi.y - pj.y, 2) === 0) {
                points[i] = undefined;
            }
        }
    }

    points = points.filter(p => p);
    const indexesToDelete = [];
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2];
        if (p1 && p2 && p3) {
            const d1 = getDirectionBetweenTwoPoints(p1, p2);
            const d2 = getDirectionBetweenTwoPoints(p2, p3);
            if (d1 && d2 && d1 === d2) {
                indexesToDelete.push(i + 1);
            }
        }
    }
    indexesToDelete.forEach(index => points[index] = undefined);

    pipeDriver.points = points.filter(p => p);
}