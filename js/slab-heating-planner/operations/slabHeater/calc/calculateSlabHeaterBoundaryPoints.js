/**
 * Kiszámolja a paraméterül kapott födémfűtő elem befoglaló pontjait
 * 
 * @param {SlabHeater} slabHeater Födémfűtő elem
 * @returns {{p1: Point, p2: Point}} Befoglaló pontok
 */
function calculateSlabHeaterBoundaryPoints(slabHeater) {
    checkClass(slabHeater, CLASS_SLAB_HEATER);

    const ratio = pixelsPerMetersRatio;
    const centerPoint = slabHeater.centerPosition;
    const group = getSlabHeaterGroupById(slabHeater.groupId);
    const width = group.width * ratio;
    const length = group.length * ratio;
    const alignment = group.alignment;

    let x_;
    let y_;
    if (alignment % 2 === 0) {
        x_ = length;
        y_ = width;
    } else {
        x_ = width;
        y_ = length;
    }

    const x1 = centerPoint.x - x_ / 2;
    const y1 = centerPoint.y - y_ / 2;

    const x2 = centerPoint.x + x_ / 2;
    const y2 = centerPoint.y + y_ / 2;
    return {
        p1: createPoint(x1, y1),
        p2: createPoint(x2, y2)
    };

}