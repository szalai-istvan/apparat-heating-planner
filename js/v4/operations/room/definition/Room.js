class Room {
    id;

    name;
    tilted;
    textCenterCoordinates;

    firstPoint;
    middlePoint;
    width;
    height;
    angleRad = 0.00;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    textBox;

    isSelected = false;
    cursorIsInsideCache = null;

    constructor(name, tilted) {
        this.id = createUniqueId();

        this.name = name || '';
        this.tilted = tilted;
    }
}