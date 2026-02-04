import { ElementStore } from "../../common/store/ElementStore.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";
import { Box } from "../entities/Box.js";

const className = SlabHeatingPlannerConstants.classNames.box;

/**
 * Az összes doboz lekérdezése.
 * 
 * @returns {Box[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú doboz lekérdezése.
 * 
 * @param {string} id 
 * @returns {Box}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján dobozok lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {Box[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján doboz törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes doboz törlése.
 * 
 * @returns {undefined}
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * dobozokkal kapcsolatos szolgáltatások gyűjteménye.
 */
export const BoxService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}