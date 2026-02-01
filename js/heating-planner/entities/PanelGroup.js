/**
 * Egy panelcsoportot reprezentáló osztály.
 */
export class PanelGroup {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    boundingBoxIncludingPipes;
    /** @type {boolean} */
    isSelected;
    /** @type {boolean} */
    isSelectedForDrag;
    
    /** @type {string} */
    type;
    /** @type {object} */
    details;
    /** @type {number} */
    lengthInPixels;
    /** @type {number} */
    widthInPixels;
    /** @type {number} */
    alignment;
    /** @type {number} */
    angleRad = 0.00;
    /** @type {number} */
    clickedMemberIndex = undefined;
    /** @type {string} */
    roomId = null;
    /** @type {string[]} */
    panelIds = [];
    /** @type {boolean} */
    cursorIsInsideCache = null;

    constructor({ panel, type }) {
        // this.id = createUniqueId();

        // setupPanelGroupType(this, type); todo

        if (panel) {
            this.panelIds.push(panel.id);
            panel.groupId = this.id;
        }

        this.alignment = cachedPanelGroupAlignment;
        // elementStore.register(this);
    }
}