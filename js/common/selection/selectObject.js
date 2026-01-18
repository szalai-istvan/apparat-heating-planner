/** Kiválasztott objektum */
let selectedObject;
/** @type {Function} */
let projectSpecificSelectObjectFunction = (obj) => {};

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
    } else if (className === CLASS_BLUEPRINT) {
        if (selectBlueprint(obj)) {
            selectedObject = obj;
        }
    } else {
        projectSpecificSelectObjectFunction(obj);
    }
}

/**
 * Beállítja a projekt specifikus objektum választó függvény értékét.
 * (obj: any) => undefined
 * 
 * @param {Function} func 
 * @returns {undefined}
 */
function setProjectSpecificSelectObjectFunction(func) {
    projectSpecificSelectObjectFunction = func;
}