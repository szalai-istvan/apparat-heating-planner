import { ElementStore } from "../../common/store/ElementStore.js";
import { HeatingPlannerConstants } from "../appdata/ConstantsHeatingPlanner.js";
import { PanelGroup } from "../entities/PanelGroup.js";

const className = HeatingPlannerConstants.classNames.panelGroup;

/**
 * Az összes PanelGroupok lekérdezése.
 * 
 * @returns {PanelGroup[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú PanelGroup lekérdezése.
 * 
 * @param {string} id 
 * @returns {PanelGroup}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján PanelGroupok lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {PanelGroup[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján PanelGroup törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes PanelGroup törlése.
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * PanelGroupekkel kapcsolatos szolgáltatások gyűjteménye.
 */
export const PanelGroupService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}