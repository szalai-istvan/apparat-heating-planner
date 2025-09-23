class PanelGroup {
    id;

    type;
    details;
    lengthInPixels;
    widthInPixels;
    alignment;
    angleDeg = 0.00;
    /** @type {Rectangle} */
    boundingBox;

    isSelected = false;
    isSelectedForDrag = false;
    clickedMemberIndex = undefined;
    
    roomId = null;
    panelIds = [];
    cursorIsInsideCache = null;

    constructor({ panel, type }) {
        this.id = createUniqueId();

        setupPanelGroupType(this, type);
        
        if (panel) {
            this.panelIds.push(panel.id);
            panel.groupId = this.id;
        }

        this.alignment = cachedPanelGroupAlignment;
        elementStore.register(this);
    }
}