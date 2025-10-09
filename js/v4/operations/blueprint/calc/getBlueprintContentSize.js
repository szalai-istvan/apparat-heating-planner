/**
 * Kiszámítja az összes tervrajzot befoglaló egyenes téglalap méreteit
 * 
 * @returns {{x: number, y: number, w: number, h: number}}
 */
function getBlueprintContentSize() {
    const result = {
        x: null,
        y: null,
        w: null,
        h: null
    };

    /** @type {Point[]} */
    let points = [];
    elementStore.blueprints.map(bp => createBlueprintBoundingBox(bp)).forEach(bb => points = [...points, ...bb.points]);
    elementStore.rooms.map(r => r.boundingBox).forEach(bb => points = [...points, ...bb.points]);
    console.log(points);

    const minX = points.map(p => p.x).reduce(minimumFunction);
    const maxX = points.map(p => p.x).reduce(maximumFunction);
    const minY = points.map(p => p.y).reduce(minimumFunction);
    const maxY = points.map(p => p.y).reduce(maximumFunction);

    result.x = minX;
    result.y = minY;
    result.w = maxX - minX;
    result.h = maxY - minY;

    console.log(result);
    return result;
}