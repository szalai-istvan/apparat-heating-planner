class Room {
    id;

    name;
    points = [];
    isSelected = false;
    middlePoint;
    textSize;
    textCenterCoordinates;
    lineWeight;
    slabHeaterColor;
    cursorIsInsideCache = null;

    constructor(name) {
        this.id = createUniqueId();

        this.name = name || '';

        const ratio = pixelsPerMetersRatio;
        this.textSize = ROOM_TEXT_SIZE_IN_METERS * ratio;
        this.lineWeight = ROOM_LINE_WEIGHT_IN_METERS * ratio;
        this.slabHeaterColor = retrieveSlabHeaterColor();
    }
}