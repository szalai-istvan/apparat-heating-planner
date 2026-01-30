import { Blueprint } from "../entities/Blueprint.js";
import { ElementStore } from "../store/ElementStore.js";

const className = 'Blueprint';

/**
 * Az összes tervrajz lekérdezése.
 * 
 * @returns {Blueprint[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú tervrajz lekérdezése.
 * 
 * @param {string} id 
 * @returns {Blueprint}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján tervrajzok lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {Blueprint[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján tervrajz törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes tervrajz törlése.
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * Tervrajzokkal kapcsolatos szolgáltatások gyűjteménye.
 */
export const BlueprintService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}