class RoomRenderer {

    static draw(room) {
        if (getClassName(room) !== 'Room') {
            throw new Error('RoomRenderer can only render Rooms!');
        }
        const points = RoomRenderer.getPointsToDraw(room);
        const length = points.length;

        if (length < 2) {
            return;
        }

        RoomRenderer.updateSettingsToDraw(room);

        for (let index = 0; index < length; index++) {
            const p1 = points[index];
            const p2 = points[(index + 1) % length];

            line(p1.x, p1.y, p2.x, p2.y);
        }

        pop();
        const textCenterCoordinates = room.isSelected ? screenContext.getMousePositionAbsolute() : room.textCenterCoordinates;
        if (RoomManager.roomIsConfigured(room)) {
            RoomRenderer.updateSettingsToText(room);
            text(room.name, textCenterCoordinates.x, textCenterCoordinates.y);
            pop();
        }

        RoomRenderer.drawRoomSize(room, points);
    }

    static getPointsToDraw(room) {
        const points = room.points;
        
        const p0 = points[0];
        if (!p0) {
            return [];
        }

        const p1 = points.length >= 2 ? points[1] : screenContext.getMousePositionAbsolute();

        const pointsToDraw = [];
        pointsToDraw.push({x: p0.x, y: p0.y});
        pointsToDraw.push({x: p0.x, y: p1.y});
        pointsToDraw.push({x: p1.x, y: p1.y});
        pointsToDraw.push({x: p1.x, y: p0.y});

        return pointsToDraw;
    }

    static updateSettingsToDraw(room) {
        push();
        if (room.isSelected) {
            stroke(SELECTED_TEXT_COLOR);
            strokeWeight(room.lineWeight * 2);
        } else {
            stroke(ROOM_DEFAULT_TEXT_COLOR);
            strokeWeight(room.lineWeight);
        }
    }

    static updateSettingsToText(room) {
        push();
        textAlign(CENTER, CENTER);
        if (RoomManager.mouseCursorIsInsideName(room)) {
            fill(SELECTED_TEXT_COLOR);
            textSize(room.textSize * ROOM_TEXT_POP_FACTOR);
        } else {
            fill(ROOM_DEFAULT_TEXT_COLOR);
            textSize(room.textSize);
        }
    }

    static drawRoomSize(room, points) {
        const topY = points.map(p => p.y).reduce(minimumFunction);
        const rightX = points.map(p => p.x).reduce(maximumFunction);
        const middlePoint = RoomManager.getMiddlePoint(room);

        const width = `${roundNumber(RoomManager.getWidthInMeters(room, points), 1)} m`;
        const height = `${roundNumber(RoomManager.getHeightInMeters(room, points), 1)} m`;

        textSize(room.textSize);
        if (room.isSelected) {
            fill(SELECTED_TEXT_COLOR);
        } else {
            fill(ROOM_DEFAULT_TEXT_COLOR);
        }

        textAlign(CENTER, BOTTOM);
        text(width, middlePoint.x, topY - 5);
        textAlign(LEFT, CENTER);
        text(height, rightX + 5, middlePoint.y);
    }
}