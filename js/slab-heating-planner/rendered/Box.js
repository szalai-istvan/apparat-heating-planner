class Box {
    id;
    centerPosition;
    
    groupId;
    cursorIsInsideCache = null;

    constructor(centerPosition) {
        this.id = createUniqueId();

        this.centerPosition = centerPosition;
        elementStore.register(this);
    }
}