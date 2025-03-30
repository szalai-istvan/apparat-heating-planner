class UD30Manager {

    static createUD30BeamsForRoom(room) {
        if (getClassName(room) !== 'Room') {
            throw new Error('Invalid parameter type for UD30 generating!');
        }

        const points = room.points;
        if (points.length < 2) {
            return;
        }

        const minX = room.points.map(p => p.x).reduce(minimumFunction);
        const maxX = room.points.map(p => p.x).reduce(maximumFunction);

        const minY = room.points.map(p => p.y).reduce(minimumFunction);
        const maxY = room.points.map(p => p.y).reduce(maximumFunction);

        const topLeft = { x: minX, y: minY };
        const topRight = { x: maxX, y: minY };
        const bottomLeft = { x: minX, y: maxY };
        const bottomRight = { x: maxX, y: maxY };

        const widthPixel = UD30_WIDTH_METER * scaleContext.pixelsPerMetersRatio;
        const halfWidth = widthPixel / 2;

        const topBeam = UD30Manager.createBeamDefinition(topLeft, topRight, { x: 0, y: halfWidth });
        const bottomBeam = UD30Manager.createBeamDefinition(bottomLeft, bottomRight, { x: 0, y: -halfWidth });
        const leftBeam = UD30Manager.createBeamDefinition(topLeft, bottomLeft, { x: halfWidth, y: 0 });
        const rightBeam = UD30Manager.createBeamDefinition(topRight, bottomRight, { x: -halfWidth, y: 0 });

        const beams = {
            lineWidth: ROOM_LINE_WEIGHT_IN_METERS * scaleContext.pixelsPerMetersRatio,
            beamWidthPixel: widthPixel,
            text: UD_30_BEAM_TYPE,
            textSize: BEAM_TEXT_SIZE_METER * scaleContext.pixelsPerMetersRatio * 0.6,
            beams: { topBeam, bottomBeam, leftBeam, rightBeam }
        };

        room.ud30BeamsInRoom = beams;
        return beams;
    }

    static createBeamDefinition(p1, p2, offset) {
        return {
            p1: {
                x: p1.x + offset.x,
                y: p1.y + offset.y
            },
            p2: {
                x: p2.x + offset.x,
                y: p2.y + offset.y
            }
        };
    }
}