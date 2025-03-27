
class UD30Renderer {
    static draw(room) {
        if (getClassName(room) !== 'Room') {
            throw new Error('UD30Renderer can only render Rooms!');
        }

        if (!RoomManager.roomIsConfigured(room)) {
            return;
        }

        push();
        const lineWidth = room.lineWidth;
        fill(BEAM_COLOR);
        strokeWeight(lineWidth);
        const beams = UD30Renderer.getBeams(room);
        beams.forEach(beam => UD30Renderer.drawBeam(beam));
        pop();
    }

    static getBeams(room) {
        const points = RoomRenderer.getPointsToDraw(room);
        return [
            UD30Renderer.createDefinition(points[0], points[1]),
            UD30Renderer.createDefinition(points[1], points[2]),
            UD30Renderer.createDefinition(points[2], points[3]),
            UD30Renderer.createDefinition(points[3], points[0])
        ];
    }

    static createDefinition(p0, p1) {
        return {p0: {x: p0.x, y: p0.y}, p1: {x: p1.x, y: p1.y}};
    }

    static drawBeam(beam) {
        console.log(beam);
        rect(beam.p0.x, beam.p0.y, beam.p1.x - beam.p0.x, 20); // TODO .......
    }
}