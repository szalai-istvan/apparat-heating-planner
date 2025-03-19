class Room {
    name;
    points = [];
    isSelected = false;
    middlePoint;
    textSize;
    lineWeight;
    structureElementsInRoom;

    constructor(name) {
        this.name = name || '';
        renderer.register(this);

        const ratio = scaleContext.pixelsPerMetersRatio;
        this.textSize = ROOM_TEXT_SIZE_IN_METERS * ratio;
        this.lineWeight = ROOM_LINE_WEIGHT_IN_METERS * ratio;

        this.structureElementsInRoom = new StructureElementsInRoom(this);
    }
}