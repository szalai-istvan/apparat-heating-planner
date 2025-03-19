class StructureElementsInRoom {
    alignment;
    room;
    beamWidthPixel;
    textSize;
    lineWidth;

    panels = [];
    alignedBeams = [];
    crossBeams = [];

    drawAlignedBeamsFunc;
    drawCrossBeamsFunc;

    constructor(room) {
        this.room = room;
        this.alignment = undefined;
        renderer.register(this);
        this.lineWidth = ROOM_LINE_WEIGHT_IN_METERS * scaleContext.pixelsPerMetersRatio;

        this.beamWidthPixel = BEAM_WIDTH_METER * scaleContext.pixelsPerMetersRatio;
        this.textSize = BEAM_TEXT_SIZE_METER * scaleContext.pixelsPerMetersRatio;
    }
}
