import { ElementStore } from "../../common/store/ElementStore.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";
import { PipeDriver } from "../entities/PipeDriver.js";

const className = SlabHeatingPlannerConstants.classNames.pipeDriver;

/**
 * Az összes csőnyomvonal lekérdezése.
 * 
 * @returns {PipeDriver[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú csőnyomvonal lekérdezése.
 * 
 * @param {string} id 
 * @returns {PipeDriver}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján csőnyomvonalak lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {PipeDriver[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján csőnyomvonal törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes csőnyomvonal törlése.
 * 
 * @returns {undefined}
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * csőnyomvonalokkal kapcsolatos szolgáltatások gyűjteménye.
 */
export const PipeDriverService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}