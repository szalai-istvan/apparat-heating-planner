class Panel {
    type;
    details;
    lengthInPixels;
    widthInPixels;
    topLeftCoordinates;
    isSelected;
    isSelectedForDrag;
    alignment = 0;
    numberOfPanelsInGroup = 1;
    textWidth;
    textSize;
    countourLineWeight;
    lineWeight;
    room;

    constructor(type) {
        const ratio = scaleContext.pixelsPerMetersRatio;
        this.countourLineWeight = PANEL_CONTOUR_LINE_THICKNESS * ratio;
        this.lineWeight = PANEL_LINE_THICKNESS * ratio;

        this.setType(type);
        this.selectForDrag();
        renderer.register(this);
    }
}