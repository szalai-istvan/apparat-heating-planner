import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { ClassUtil } from "../../../common/util/ClassUtil.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";

/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObjectSlabHeatingPlanner(obj) {
    const className = ClassUtil.getClassName(obj);

    if (className === SlabHeatingPlannerConstants.classNames.slabHeaterGroup) {
        if (selectSlabHeaterGroup(obj)) {
            ApplicationState.selectedObject = obj;
        }
    } else if (className === SlabHeatingPlannerConstants.classNames.boxGroup) {
        if (selectBoxGroup(obj)) {
            ApplicationState.selectedObject = obj;
        }
    else if (className === SlabHeatingPlannerConstants.classNames.pipeDriver) {
        if (selectPipeDriver(obj)) {
            ApplicationState.selectedObject = obj;
        }
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
        successfulDeselect = deselectSlabHeaterGroup();
    } else if (className === SlabHeatingPlannerConstants.classNames.boxGroup) {
        successfulDeselect = deselectBoxGroup();
    } else if (className === SlabHeatingPlannerConstants.classNames.pipeDriver) {
        successfulDeselect = deselectPipeDriver();
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
        removeSelectedSlabHeaterGroup();
    } else if (className === SlabHeatingPlannerConstants.classNames.boxGroup) {
        removeSelectedBoxGroup();
    } else if (className === SlabHeatingPlannerConstants.classNames.pipeDriver) {
        resetSelectedPipeDriver();
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
    if (selectedSlabHeaterGroup) {
        rotateSelectedSlabHeaterGroup(direction);
    } else if (selectedBoxGroup) {
        rotateSelectedBoxGroup(-1 * direction);
    }
}

/**
 * Projekt specifikus választó műveletek.
 */
export const SlabHeatingPlannerSelectionAction = {
    selectObjectSlabHeatingPlanner,
    rotateSelectedObjectSlabHeatingPlanner,
    deselectObjectSlabHeatingPlanner,
    removeSelectedObjectSlabHeatingPlanner,
    clearSelectionCacheSlabHeatingPlanner
};