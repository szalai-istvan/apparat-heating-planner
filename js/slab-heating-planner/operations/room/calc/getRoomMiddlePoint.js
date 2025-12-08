function getRoomMiddlePoint(room, points = undefined) { // formerly RoomManager.getMiddlePoint()
    points = points || getPointsToDrawRoom(room);
    const length = points.length;
    if (length === 0) {
        return undefined;
    }

    const x = points.map(p => p.x).reduce(sumFunction) / length;
    const y = points.map(p => p.y).reduce(sumFunction) / length;
    return createPoint(x, y);
}