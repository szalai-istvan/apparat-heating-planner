import { ElementStore } from "../../common/store/ElementStore.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";
import { SlabHeater } from "../entities/SlabHeater.js";

const className = SlabHeatingPlannerConstants.classNames.slabHeater;

/**
 * Az összes födémfűtő lekérdezése.
 * 
 * @returns {SlabHeater[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú födémfűtő lekérdezése.
 * 
 * @param {string} id 
 * @returns {SlabHeater}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján födémfűtők lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {SlabHeater[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján födémfűtő törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes födémfűtő törlése.
 * 
 * @returns {undefined}
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * födémfűtőkkel kapcsolatos szolgáltatások gyűjteménye.
 */
export const SlabHeaterService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}