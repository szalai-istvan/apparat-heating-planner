import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { ClassUtil } from "../../../common/util/ClassUtil.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { DeleteBoxGroupAction } from "../boxgroup/DeleteBoxGroupAction.js";
import { SelectBoxGroupAction } from "../boxgroup/SelectBoxGroupAction.js";
import { UpdateBoxGroupAction } from "../boxgroup/UpdateBoxGroupAction.js";
import { DeletePipeDriverAction } from "../pipeDriver/DeletePipeDriverAction.js";
import { SelectPipeDriverAction } from "../pipeDriver/SelectPipeDriverAction.js";
import { DeleteSlabHeaterGroupAction } from "../slabHeaterGroup/DeleteSlabHeaterGroupAction.js";
import { SelectSlabHeaterGroupAction } from "../slabHeaterGroup/SelectSlabHeaterGroupAction.js";
import { UpdateSlabHeaterGroupAction } from "../slabHeaterGroup/UpdateSlabHeaterGroupAction.js";

/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObjectSlabHeatingPlanner(obj) {
    const className = ClassUtil.getClassName(obj);

    if (className === SlabHeatingPlannerConstants.classNames.slabHeaterGroup) {
        if (SelectSlabHeaterGroupAction.selectSlabHeaterGroup(obj)) {
            ApplicationState.selectedObject = obj;
        }
    } else if (className === SlabHeatingPlannerConstants.classNames.boxGroup) {
        if (SelectBoxGroupAction.selectBoxGroup(obj)) {
            ApplicationState.selectedObject = obj;
        }
    } else if (className === SlabHeatingPlannerConstants.classNames.pipeDriver) {
        if (SelectPipeDriverAction.selectPipeDriver(obj)) {
            ApplicationState.selectedObject = obj;
        }
    } else {
        throw new Error(`Unexpected class of selected object: ${className}`);
    }
}

/**
 * Megszűnteti a kijelölt objektum kiválasztását és visszaküldi, hogy sikerült-e
 * 
 * @param {string} className a kijelölt objektum osztályának neve.
 * @returns {boolean} a művelet sikeressége
 */
function deselectObjectSlabHeatingPlanner(className) {
    let successfulDeselect;
    if (className === SlabHeatingPlannerConstants.classNames.slabHeaterGroup) {
        successfulDeselect = SelectSlabHeaterGroupAction.deselectSlabHeaterGroup();
    } else if (className === SlabHeatingPlannerConstants.classNames.boxGroup) {
        successfulDeselect = SelectBoxGroupAction.deselectBoxGroup();
    } else if (className === SlabHeatingPlannerConstants.classNames.pipeDriver) {
        successfulDeselect = SelectPipeDriverAction.deselectPipeDriver();
    }

    return successfulDeselect;
}

/**
 * Törli a kijelölt objektumot.
 * 
 * @param {string} className
 * @returns {undefined}
 */
function removeSelectedObjectSlabHeatingPlanner(className) {
    if (className === SlabHeatingPlannerConstants.classNames.slabHeaterGroup) {
        DeleteSlabHeaterGroupAction.removeSelectedSlabHeaterGroup();
    } else if (className === SlabHeatingPlannerConstants.classNames.boxGroup) {
        DeleteBoxGroupAction.removeSelectedBoxGroup();
    } else if (className === SlabHeatingPlannerConstants.classNames.pipeDriver) {
        DeletePipeDriverAction.performDeleteOnSelectedPipeDriver();
    }
}

/**
 * Törli az összes kijelölhető objektum kijelölő cache értékét
 * 
 * @returns {undefined}
 */
function clearSelectionCacheSlabHeatingPlanner() {
    SelectSlabHeaterGroupAction.clearSlabHeaterGroupSelectionCache();
    SelectBoxGroupAction.clearBoxGroupSelectionCache();
    SelectPipeDriverAction.clearPipeDriverSelectionCache();
}

/**
 * Elforgatja a kiválasztott objektumot a megadott irányba
 * 
 * @param {Number} direction
 * @returns {undefined}
 */
function rotateSelectedObjectSlabHeatingPlanner(direction) {
    if (SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup) {
        UpdateSlabHeaterGroupAction.rotateSelectedSlabHeaterGroup(direction);
    } else if (SlabHeatingPlannerApplicationState.selectedBoxGroup) {
        UpdateBoxGroupAction.rotateSelectedBoxGroup(direction);
    }
}

/**
 * Hozzáad egy elemet a kiválasztott csoporthoz.
 * 
 * @returns {undefined}
 */
function addToSelectedGroup() {
    if (SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup) {
        UpdateSlabHeaterGroupAction.addSlabHeaterToSelectedGroup();
    } else if (SlabHeatingPlannerApplicationState.selectedBoxGroup) {
        UpdateBoxGroupAction.addBoxToSelectedGroup();
    }
}

/**
 * Eltávolítja az utolsó elemet a kiválasztott csoportból.
 * 
 * @returns {undefined}
 */
function removeLastFromSelectedGroup() {
    if (SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup) {
        UpdateSlabHeaterGroupAction.removeLastSlabHeaterFromSelectedGroup();
    } else if (SlabHeatingPlannerApplicationState.selectedBoxGroup) {
        UpdateBoxGroupAction.removeLastBoxFromSelectedGroup();
    }
}

/**
 * Projekt specifikus választó műveletek.
 */
export const SlabHeatingPlannerSelectionAction = {
    addToSelectedGroup,
    removeLastFromSelectedGroup,
    selectObjectSlabHeatingPlanner,
    deselectObjectSlabHeatingPlanner,
    clearSelectionCacheSlabHeatingPlanner,
    rotateSelectedObjectSlabHeatingPlanner,
    removeSelectedObjectSlabHeatingPlanner
};