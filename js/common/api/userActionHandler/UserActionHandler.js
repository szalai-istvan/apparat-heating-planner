function handleUserActionNoParam(func) {
    try {
        func();
    } catch (error) {
        console.trace();
        console.error(error);
        // todo displayMessage és hasonlók
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
        console.error(error);
        // todo displayMessage és hasonlók
    }
}

/**
 * Felhasználói interakció wrapper függvény.
 */
export const UserActionHandler = {
    handleUserActionNoParam,
    handleUserActionParam1
};