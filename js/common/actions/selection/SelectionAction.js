import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { SelectRoomAction } from "../room/SelectRoomAction.js";
import { ClassUtil } from "../../util/ClassUtil.js";

/** @type {Function} */
let projectSpecificSelectObjectFunction = (obj) => {};
/** @type {Function} */
let projectSpecificDeselectFunction = (className) => {};

/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObject(obj) {
    const className = ClassUtil.getClassName(obj);

    if (className === Constants.classNames.room) {
        if (SelectRoomAction.selectRoom(obj)) {
            ApplicationState.selectedObject = obj;
        }
    } else if (className === Constants.classNames.blueprint) {
        if (SelectBlueprintAction.selectBlueprint(obj)) {
            ApplicationState.selectedObject = obj;
        }
    } else {
        projectSpecificSelectObjectFunction(obj);
    }
}

/**
 * Megkísérli megszűntetni a kijelölt objektum kiválasztását és visszaküldi, hogy sikerült-e.
 * Ez a függvény jobb klikknél és objektum választásnál fut le. A sikertelenséget elbukó validációk okozhatják.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectObject() {
    const selected = ApplicationState.selectedObject;
    if (selected === null || selected === undefined) {
        return true;
    }

    const className = getClassName(selected);
    let successfulDeselect;
    if (className === CLASS_ROOM) {
        successfulDeselect = deselectRoom();
    } else if (className === CLASS_BLUEPRINT) {
        successfulDeselect = deselectBlueprint();
    } else {
        successfulDeselect = projectSpecificDeselectFunction(className);
    }

    if (successfulDeselect) {
        selectedObject = null;
    }

    return successfulDeselect;
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

/**
 * Beállítja a projekt specifikus választás megszüntető függvény értékét.
 * A paraméterül adott függvénynek string paramétert kell elfogadnia, és undefined értéket kell visszaadnia.
 * (className: string) => undefined
 * 
 * @param {Function} func 
 * @returns {undefined}
 */
function setProjectSpecificDeselectFunction(func) {
    projectSpecificDeselectFunction = func;
}

/**
 * Szelektálással kapcsolatos műveletek
 */
export const SelectionAction = {
    selectObject,
    setProjectSpecificSelectObjectFunction,
    deselectObject,
    setProjectSpecificDeselectFunction
};