class Box {
    id;
    centerPosition;

    /** @type {Rectangle} */
    boundingBox;
    
    groupId;
    cursorIsInsideCache = null;

    constructor(centerPosition) {
        this.id = createUniqueId();

        this.centerPosition = centerPosition;
        elementStore.register(this);
    }
}