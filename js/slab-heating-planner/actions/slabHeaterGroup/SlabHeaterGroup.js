class SlabHeaterGroup {
    id;

    type;
    color;

    alignment;
    length;
    lengthInPixels;
    width;
    widthInPixels;

    isSelected;
    isSelectedForDrag;
    clickedMemberIndex;
    
    angleDeg = 0.00;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    boundingBoxIncludingPipes;

    roomId = null;
    slabHeaterIds = [];
    cursorIsInsideCache = null;
    pipeDriverId = null;

    constructor({ slabHeater, length, width, alignment }) {
        this.id = createUniqueId();

        if (slabHeater) {
            this.slabHeaterIds.push(slabHeater.id);
            slabHeater.groupId = this.id;
        }

        this.isSelected = false;
        this.isSelectedForDrag = false;
        this.color = BLACK;

        this.alignment = alignment;
        this.length = length;
        this.lengthInPixels = length * pixelsPerMetersRatio;
        this.width = width;
        this.widthInPixels = width * pixelsPerMetersRatio;
        updateSlabHeaterGroupType(this);

        this.pipeDriverId = new PipeDriver(this).id;

        elementStore.register(this);
    }
}