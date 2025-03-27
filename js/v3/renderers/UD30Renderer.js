
class UD30Renderer {
    static draw(room) {
        if (getClassName(room) !== 'Room') {
            throw new Error('UD30Renderer can only render Rooms!');
        }

        // TODO cont.
        // const lineWidth = ROOM_LINE_WEIGHT_IN_METERS * scaleContext.pixelsPerMetersRatio;
        // fill(BEAM_COLOR);
        // stroke(lineWidth);
    }
}