class SlabHeater {
    id;

    /** @type {Point} */
    centerPosition;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    textBox;

    cursorIsInsideCache;
    
    groupId;

    constructor() {
        this.id = createUniqueId();
        this.centerPosition = getCorrectedMousePositionAbsolute();
        elementStore.register(this);
    }
}