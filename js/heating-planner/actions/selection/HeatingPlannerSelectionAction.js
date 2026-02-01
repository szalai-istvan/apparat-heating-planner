import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { Constants } from "../../../common/appdata/Constants.js";
import { ClassUtil } from "../../../common/util/ClassUtil.js";
import { HeatingPlannerConstants } from "../../appdata/HeatingPlannerConstants.js";
import { SelectPanelGroupAction } from "../panelGroup/SelectPanelGroupAction.js";

/**
 * Mgszűnteti a pillanatnyi kijelölést és kiválasztja a paraméterül kapott objektumot
 * 
 * @param {*} obj 
 * @returns 
 */
function selectObjectHeatingPlanner(obj) {
    const className = ClassUtil.getClassName(obj);
    if (className === HeatingPlannerConstants.classNames.panelGroup) {
        if (SelectPanelGroupAction.selectPanelGroup(obj)) {
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
function deselectObjectHeatingPlanner(className) {
    let successfulDeselect;
    if (className === HeatingPlannerConstants.classNames.panelGroup) {
        successfulDeselect = SelectPanelGroupAction.deselectPanelGroup();
    }

    return successfulDeselect;
}

/**
 * Törli az összes kijelölhető objektum kijelölő cache értékét
 * 
 * @returns {undefined}
 */
function clearSelectionCacheHeatingPlanner() {
    SelectPanelGroupAction.clearPanelGroupSelectionCache();
}

/**
 * Törli a kijelölt objektumot.
 * 
 * @param {string} className
 * @returns {undefined}
 */
function removeSelectedObjectHeatingPlanner(className) {
    if (className === HeatingPlannerConstants.classNames.panelGroup) {
        removeSelectedPanelGroup();
    }
}

/**
 * Megkeresi és visszaadja a kiválasztható panelcsoportot.
 * 
 * @returns {PanelGroup}
 */
function searchForSelectablePanelGroup() {
    const selectedPanelGroup = SelectPanelGroupAction.selectPanelGroup();
    if (selectedPanelGroup) {
        ApplicationState.selectedObject = selectedPanelGroup;
        return selectedPanelGroup;
    }
}

/**
 * Projekt specifikus választó műveletek.
 */
export const HeatingPlannerSelectionAction = {
    selectObjectHeatingPlanner,
    deselectObjectHeatingPlanner,
    clearSelectionCacheHeatingPlanner,
    removeSelectedObjectHeatingPlanner,
    searchForSelectablePanelGroup
};