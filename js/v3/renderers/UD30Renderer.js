class UD30Renderer {

    static draw(room) {
        if (getClassName(room) !== 'Room') {
            throw new Error('UD30Renderer can only render Rooms!');
        }

        if (!RoomManager.roomIsConfigured(room)) {
            return;
        }

        const beams = room.ud30BeamsInRoom;
        StructureElementsInRoomRenderer.drawHorizontalBeam(beams, beams.beams.topBeam);
        StructureElementsInRoomRenderer.drawHorizontalBeam(beams, beams.beams.bottomBeam);

        StructureElementsInRoomRenderer.drawVerticalBeam(beams, beams.beams.leftBeam);
        StructureElementsInRoomRenderer.drawVerticalBeam(beams, beams.beams.rightBeam);
    }
}