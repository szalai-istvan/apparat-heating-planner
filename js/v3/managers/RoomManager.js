class RoomManager {

    static addPoint(room) {
        const points = room.points;
        const mousePosition = screenContext.getMousePositionAbsolute();

        if (points.length >= 2) {
            return;
        } else {
            points.push(mousePosition);
            if (points.length >= 2) {
                room.middlePoint = RoomManager.getMiddlePoint(room);
                selectionContext.tryToDeselect();
                room.textCenterCoordinates = room.middlePoint;
                tooltip.roomAddingFinished();

                UD30Manager.createUD30BeamsForRoom(room);
            }
        }
    }

    static roomIsConfigured(room) {
        return room.points.length === 2;
    }

    
    static pointIsInsideRoom(room, point = undefined) {
        point = point || screenContext.getMousePositionAbsolute();
        const x = point.x;
        const y = point.y;
        
        if (room.points.length === 0) {
            return false;
        }

        const minX = room.points.map(p => p.x).reduce(minimumFunction);
        const maxX = room.points.map(p => p.x).reduce(maximumFunction);

        const minY = room.points.map(p => p.y).reduce(minimumFunction);
        const maxY = room.points.map(p => p.y).reduce(maximumFunction);

        return x > minX && x < maxX && y > minY && y < maxY;
    }

    static mouseCursorIsInsideName(room) {
        if (room.points.length < 2) {
            return false;
        }

        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            room.textCenterCoordinates, 
            textWidth(room.name),
            room.textSize
        );
    }

    static getWidthInMeters(room, points = undefined) {
        points = points || room.points;

        const maxX = points.map(p => p.x).reduce(maximumFunction);
        const minX = points.map(p => p.x).reduce(minimumFunction);

        return (maxX - minX) / scaleContext.pixelsPerMetersRatio;
    }

    static getHeightInMeters(room, points = undefined) {
        points = points || room.points;

        const maxY = points.map(p => p.y).reduce(maximumFunction);
        const minY = points.map(p => p.y).reduce(minimumFunction);

        return (maxY - minY) / scaleContext.pixelsPerMetersRatio;
    }

        
    static getMiddlePoint(room, points = undefined) {
        points = points || RoomRenderer.getPointsToDraw(room);
        const length = points.length;
        if (length === 0) {
            return;
        }

        const x = points.map(p => p.x).reduce((a, b) => a + b) / length;
        const y = points.map(p => p.y).reduce((a, b) => a + b) / length;

        return {x, y};
    }

    static getArea(room) {
        return RoomManager.getWidthInMeters(room) * RoomManager.getHeightInMeters(room);
    }

    static getCircumference(room) {
        return 2 * (RoomManager.getWidthInMeters(room) + RoomManager.getHeightInMeters(room));
    }

    static tryToRegisterPanelGroup(room, panel) {
        return StructureElementManager.tryToAddPanelGroup(room.structureElementsInRoom, panel);
    }

    static removePanelFromRoom(room, panel) {
        StructureElementManager.removePanelGroup(room.structureElementsInRoom, panel);
    }

    static registerRotation(room, panel) {
        return StructureElementManager.registerRotation(room.structureElementsInRoom, panel);
    }

    static recalculateBeams(room) {
        StructureElementManager.recalculateBeams(room.structureElementsInRoom);
    }

    static getCd3060Amount(room) {
        return StructureElementManager.getCd3060Amount(room.structureElementsInRoom);
    }
}