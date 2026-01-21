class BoxGroup {
    id;

    alignment;
    cursorIsInsideCache = null;
    clickedMemberIndex;
    isSelected;
    isSelectedForDrag;
    pipeDriverEndNodeCoordinates = null;

    /** @type {Rectangle} */
    boundingBox; 

    boxIds = [];
    pipeDriverId = null;

    constructor({box, alignment}) {
        this.id = createUniqueId();

        checkClass(box, CLASS_BOX, true);

        if (box) {
            this.boxIds.push(box.id);
            box.groupId = this.id;
        }
        this.alignment = alignment;

        elementStore.register(this);
    }
}