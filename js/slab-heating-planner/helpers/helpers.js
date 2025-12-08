function calculateDistance(p1, p2) {
    const deltaX = p2.x - p1.x;
    const deltaY = p2.y - p1.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

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

function createUniqueId() {
    return Math.random().toString().substring(2) + Math.random().toString().substring(2);
}