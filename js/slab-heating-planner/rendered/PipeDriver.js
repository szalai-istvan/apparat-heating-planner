class PipeDriver {
    id;
    isSelected;
    isSelectedForDrag;
    selectedPointIndex;
    selectedPointIndexCache = null;
    cursorIsInsidePointIndexCache = null;
    
    /** @type {Point[]} */ points = [];
    isFullyConfigured = false;
    slabHeaterGroupId;
    /** @type {Point[][]} */
    pipes = [];

    constructor(slabHeaterGroup) {
        this.id = createUniqueId();

        const firstPoint = calculatePipeDriverFirstPoint(slabHeaterGroup);
        this.slabHeaterGroupId = slabHeaterGroup.id;

        firstPoint && this.points.push(firstPoint);

        elementStore.register(this);
    }
}