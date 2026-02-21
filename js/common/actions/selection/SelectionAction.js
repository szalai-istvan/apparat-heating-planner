import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { Blueprint } from "../../entities/Blueprint.js";
import { Room } from "../../entities/Room.js";
import { CustomEventTypes } from "../../event/CustomEventTypes.js";
import { Events } from "../../event/Events.js";
import { DeleteBlueprintConfirmDialog } from "../../ui/dialog/DeleteBlueprintConfirmDialog.js";
import { RotateBlueprintDialog } from "../../ui/dialog/RotateBlueprintDialog.js";
import { ClassUtil } from "../../util/ClassUtil.js";
import { DeleteBlueprintAction } from "../blueprint/DeleteBlueprintAction.js";
import { SelectBlueprintAction } from "../blueprint/SelectBlueprintAction.js";
import { DeleteRoomAction } from "../room/DeleteRoomAction.js";
import { SelectRoomAction } from "../room/SelectRoomAction.js";

/** @type {Function} */
let projectSpecificSelectObjectFunction = (obj) => {};
/** @type {Function} */
let projectSpecificDeselectFunction = (className) => {};
/** @type {Function[]} */
const selectableObjectSearchSteps = [];
/** @type {Function} */
let projectSpecificClearSelectionCacheFunction = () => {};

/**
 * Kiválasztható objektum keresése, amely a bal egérgomb elengedésekor fut le.
 * 
 * @returns {undefined}
 */
function searchSelectableObject() {
    for (let searchFunction of selectableObjectSearchSteps) {
        const searchFunctionResult = searchFunction();
        if (searchFunctionResult) {
            ApplicationState.selectedObject = searchFunctionResult;
            return searchFunctionResult;
        }
    }

    return undefined;
}

/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot.
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

    const className = ClassUtil.getClassName(selected);
    let successfulDeselect;
    if (className === Constants.classNames.room) {
        successfulDeselect = SelectRoomAction.deselectRoom();
    } else if (className === Constants.classNames.blueprint) {
        successfulDeselect = SelectBlueprintAction.deselectBlueprint();
    } else {
        successfulDeselect = projectSpecificDeselectFunction(className);
    }

    if (successfulDeselect) {
        ApplicationState.selectedObject = null;
    }

    return successfulDeselect;
}

/**
 * Törli az összes kijelölhető objektum kijelölő cache értékét.
 * Ez a függvény minden renderelési ciklus elején fut le.
 * 
 * @returns {undefined}
 */
function clearSelectionCache() {
    SelectRoomAction.clearRoomSelectionCache();
    SelectBlueprintAction.clearBlueprintSelectionCache();

    projectSpecificClearSelectionCacheFunction();
}

/**
 * Elforgatja a kiválasztott objektumot.
 * 
 * @param {Number} direction Forgatás iránya
 * @returns {undefined}
 */
function rotateSelectedObject(direction) {
    if (!ApplicationState.selectedObject) {
        return;
    }

    const className = ClassUtil.getClassName(ApplicationState.selectedObject);
    
    if (className === Constants.classNames.blueprint) {
        RotateBlueprintDialog.openRotateBlueprintDialog();
    } else {
        Events.dispatchCustomEvent(CustomEventTypes.rotateSelectedObject, direction);
    }
}

/**
 * Törli a kijelölt objektumot.
 * 
 * @returns {undefined}
 */
function removeSelectedObject() {
    const selected = ApplicationState.selectedObject;
    if (!selected) {
        return;
    }
    const className = ClassUtil.getClassName(selected);
    
    if (className === Constants.classNames.room) {
        DeleteRoomAction.removeSelectedRoom();
    } else if (className === Constants.classNames.blueprint) {
        DeleteBlueprintConfirmDialog.openDialog();
        return;
    } else {
        Events.dispatchCustomEvent(CustomEventTypes.removeSelectedObject, className);
    }

    ApplicationState.selectedObject = null;
}

/**
 * Beállítja a projekt specifikus választás ürítő függvényt.
 * 
 * @param {Function} func függvény
 * @returns {undefined}
 */
function setProjectSpecificClearSelectionCacheFunction(func) {
    projectSpecificClearSelectionCacheFunction = func;
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
 * Beállítja az objektum választás lépéseit.
 * 
 * @param {Function[]} steps 
 * @returns {undefined}
 */
function setSelectableObjectSearchStep(steps) {
    if (selectableObjectSearchSteps.length > 0) {
        throw new Error('selectableObjectSearchSteps can only be set once!');
    }

    for (let step of steps) {
        selectableObjectSearchSteps.push(step);
    }
}

// legyenek lépések, a common lépések ebben a fájlban definiálva, és a user egy függvényhívással beállítja, hogy mely lépéseket és milyen sorrendben szeretne végrehajtani.

/**
 * Megkeresi és visszaadja a kiválasztható tervrajzot.
 * 
 * @returns {Blueprint}
 */
function searchForSelectableBlueprint() {
    const selectedBlueprint = SelectBlueprintAction.selectBlueprint();
    if (selectedBlueprint) {
        ApplicationState.selectedObject = selectedBlueprint;
        return selectedBlueprint;
    }
}

/**
 * Megkeresi és visszaadja a kiválasztható szobát.
 * 
 * @returns {Room}
 */
function searchForSelectableRoom() {
    const selectedRoom = SelectRoomAction.selectRoom();
    if (selectedRoom) {
        ApplicationState.selectedObject = selectedRoom;
        return selectedRoom;
    }
}

/**
 * Szelektálással kapcsolatos műveletek
 */
export const SelectionAction = {
    searchSelectableObject,
    searchForSelectableBlueprint,
    searchForSelectableRoom,
    selectObject,
    deselectObject,
    clearSelectionCache,
    removeSelectedObject,
    setProjectSpecificSelectObjectFunction,
    setProjectSpecificDeselectFunction,
    setProjectSpecificClearSelectionCacheFunction,
    setSelectableObjectSearchStep,
    rotateSelectedObject
};