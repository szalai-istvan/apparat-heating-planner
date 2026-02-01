import { HeatingPlannerConstants } from "../appdata/ConstantsHeatingPlanner.js";
import { StructureElements } from "../entities/StructureElements.js";
import { ElementStore } from "../../common/store/ElementStore.js";

const className = HeatingPlannerConstants.classNames.structureElements;

/**
 * Az összes szerkezeti elem lekérdezése.
 * 
 * @returns {StructureElements[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú szerkezeti elem lekérdezése.
 * 
 * @param {string} id 
 * @returns {StructureElements}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján szerkezeti elemek lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {StructureElements[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján szerkezeti elem törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes szerkezeti elem törlése.
 * 
 * @returns {undefined}
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * Szerkezeti elemekkel kapcsolatos szolgáltatások gyűjteménye.
 */
export const StructureElementsService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}