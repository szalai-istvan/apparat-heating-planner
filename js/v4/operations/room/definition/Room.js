class Room {
    id;

    name;
    tilted;
    textCenterCoordinates;
    textCenterCoordinatesRelative;

    firstPoint;
    middlePoint;
    width;
    height;
    angleRad = 0.00;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    textBox;
    /** @type {GridDefinition} */
    roomGridDefinition;

    isSelected = false;
    cursorIsInsideCache = null;

    structureElementsId;

    constructor(name, tilted) {
        this.id = createUniqueId();

        this.name = name || '';
        this.tilted = tilted;
    }
}