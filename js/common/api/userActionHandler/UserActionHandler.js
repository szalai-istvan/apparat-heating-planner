import { Errors } from "../../errors/Errors.js";

function handleUserActionNoParam(func) {
    try {
        func();
    } catch (error) {
        Errors.handleError(error);
    }
}

/**
 * Felhasználói művelet kezelő wrapper függvény.
 * 
 * @param {Function} func 
 * @param {any} param 
 */
function handleUserActionParam1(func, param) {
    try {
        func(param);
    } catch (error) {
        Errors.handleError(error);
    }
}

/**
 * Felhasználói interakció wrapper függvény.
 */
export const UserActionHandler = {
    handleUserActionNoParam,
    handleUserActionParam1
};