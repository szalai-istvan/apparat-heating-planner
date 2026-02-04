import { ElementStore } from "../../common/store/ElementStore.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";
import { BoxGroup } from "../entities/BoxGroup.js";

const className = SlabHeatingPlannerConstants.classNames.boxGroup;

/**
 * Az összes dobozcsoport lekérdezése.
 * 
 * @returns {BoxGroup[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú dobozcsoport lekérdezése.
 * 
 * @param {string} id 
 * @returns {BoxGroup}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján dobozcsoportok lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {BoxGroup[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján dobozcsoport törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes dobozcsoport törlése.
 * 
 * @returns {undefined}
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * dobozcsoportokkal kapcsolatos szolgáltatások gyűjteménye.
 */
export const BoxGroupService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}