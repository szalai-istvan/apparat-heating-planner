function pointIsInside(point, middlePoint, areaWidth, areaHeight) {
    const x = point.x;
    const y = point.y;
    let minX, maxX, minY, maxY;

    minX = middlePoint.x - areaWidth / 2;
    maxX = middlePoint.x + areaWidth / 2;

    minY = middlePoint.y - areaHeight / 2;
    maxY = middlePoint.y + areaHeight / 2;

    return x > minX && x < maxX && y > minY && y < maxY;
}