import { HeatingPlannerConstants } from "../appdata/ConstantsHeatingPlanner.js";
import { Panel } from "../entities/Panel.js";
import { ElementStore } from "../../common/store/ElementStore.js";

const className = HeatingPlannerConstants.classNames.panel;

/**
 * Az összes panelok lekérdezése.
 * 
 * @returns {Panel[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú panelok lekérdezése.
 * 
 * @param {string} id 
 * @returns {Panel}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján panelok lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {Panel[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján panel törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes panel törlése.
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * Panelekkel kapcsolatos szolgáltatások gyűjteménye.
 */
export const PanelService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}