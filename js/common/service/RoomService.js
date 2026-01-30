import { Room } from "../entities/Room.js";
import { ElementStore } from "../store/ElementStore.js";

const className = 'Room';

/**
 * Az összes szoba lekérdezése.
 * 
 * @returns {Room[]}
 */
function findAll() {
    return ElementStore.findAll(className);
}

/**
 * A megadott azonosítójú szoba lekérdezése.
 * 
 * @param {string} id 
 * @returns {Room}
 */
function findById(id) {
    return ElementStore.findById(className, id);
}

/**
 * Azonosító lista alapján szobaok lekérdezése.
 * 
 * @param {string[]} idList 
 * @returns {Room[]}
 */
function findByIdList(idList) {
    return ElementStore.findByIdList(className, idList);
}

/**
 * Azonosító alapján szoba törlése.
 * 
 * @param {string} id 
 */
function removeById(id) {
    ElementStore.removeById(className, id);
}

/**
 * Összes szoba törlése.
 */
function removeAll() {
    ElementStore.removeAll(className);
}

/**
 * Szobákkal kapcsolatos szolgáltatások gyűjteménye.
 */
export const RoomService = {
    findAll,
    findById,
    findByIdList,
    removeById,
    removeAll
}