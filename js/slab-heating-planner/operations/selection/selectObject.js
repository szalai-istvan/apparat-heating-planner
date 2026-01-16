//Project-specific
let selectedObject;

/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObject(obj) { //Project-specific
    const className = getClassName(obj);
    if (className === CLASS_ROOM) {
        if (selectRoom(obj)) {
            selectedObject = obj;
        }
    } else if (className === CLASS_SLAB_HEATER_GROUP) {
        if (selectSlabHeaterGroup(obj)) {
            selectedObject = obj;
        }
    } else if (className === CLASS_BOX_GROUP) {
        if (selectBoxGroup(obj)) {
            selectedObject = obj;
        }
    } else {
        throw new Error(`Unexpected class of selected object: ${className}`);
    }
}