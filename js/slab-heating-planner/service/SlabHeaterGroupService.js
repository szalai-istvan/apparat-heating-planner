import { ElementStore } from "../../common/store/ElementStore.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";
import { SlabHeaterGroup } from "../entities/SlabHeaterGroup.js";

const className = SlabHeatingPlannerConstants.classNames.slabHeaterGroup;

/**
 * Az összes födémfűtő csoport lekérdezése.
 * 
 * @returns {SlabHeaterGroup[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú födémfűtő csoport lekérdezése.
 * 
 * @param {string} id 
 * @returns {SlabHeaterGroup}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján födémfűtő csoportok lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {SlabHeaterGroup[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján födémfűtő csoport törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes födémfűtő csoport törlése.
 * 
 * @returns {undefined}
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * födémfűtő csoportokkal kapcsolatos szolgáltatások gyűjteménye.
 */
export const SlabHeaterGroupService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}