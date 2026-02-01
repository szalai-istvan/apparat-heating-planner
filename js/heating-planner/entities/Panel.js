/**
 * Egy fűtőpanelt reprezentáló entitás
 */
export class Panel {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    selectionBox;

    /** @type {boolean} */
    cursorIsInsideCache;
    
    /** @type {string} */
    groupId;

    constructor() {
        // this.id = createUniqueId();
        // this.centerPosition = getCorrectedMousePositionAbsolute();
        // elementStore.register(this); TODO ez mind a createPAnel dolga
    }
}