let selectedObject;

/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObject(obj) {
    const className = getClassName(obj);
    if (className === CLASS_ROOM) {
        if (selectRoom(obj)) {
            selectedObject = obj;
        }
    } else if (className === CLASS_PANEL_GROUP) {
        if (selectPanelGroup(obj)) {
            selectedObject = obj;
        }
    } else if (className === CLASS_BLUEPRINT) {
        if (selectBlueprint(obj)) {
            selectedBlueprint = obj;
        }
    } else {
        throw new Error(`Unexpected class of selected object: ${className}`);
    }
}