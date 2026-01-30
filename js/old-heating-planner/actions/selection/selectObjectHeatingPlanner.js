/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObjectHeatingPlanner(obj) {
    const className = getClassName(obj);
    if (className === CLASS_PANEL_GROUP) {
        if (selectPanelGroup(obj)) {
            selectedObject = obj;
        }
    } else {
        throw new Error(`Unexpected class of selected object: ${className}`);
    }
}