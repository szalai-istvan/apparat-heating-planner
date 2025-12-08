class SlabHeaterGroup {
    id;

    type;
    color;
    length;
    width;
    alignment;
    isSelected;
    isSelectedForDrag;
    clickedMemberIndex;
    
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
        this.length = length;
        this.width = width;
        this.alignment = alignment ?? 1;
        updateSlabHeaterGroupType(this);

        this.pipeDriverId = new PipeDriver(this).id;

        elementStore.register(this);
    }
}