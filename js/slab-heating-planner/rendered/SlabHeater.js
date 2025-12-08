class SlabHeater {
    id;

    /** @type {Point} */
    centerPosition;
    lineWeight;
    textSize;
    padding;
    rectWidth;
    rectHeight;
    cursorIsInsideCache;
    
    groupId;

    constructor() {
        this.id = createUniqueId();

        this.lineWeight = SLAB_HEATER_LINE_WEIGHT_IN_METER * pixelsPerMetersRatio;
        this.textSize = SLAB_HEATER_TEXT_SIZE_IN_METER * pixelsPerMetersRatio;

        this.padding = SLAB_HEATER_TYPE_RECT_PADDING_IN_METER * pixelsPerMetersRatio;

        textSize(this.textSize);
        this.rectWidth = textWidth(this.type) + this.padding;
        this.rectHeight = this.textSize + this.padding;
        
        elementStore.register(this);
    }
}