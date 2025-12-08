/**
 * Validálja egy paraméterül kapott objektum adattípusát
 * 
 * @param {*} obj Az ellenőrizendő objektum
 * @param {string} expectedClass A megfelelő adattípus
 * @param {boolean} undefinedAllowed megengedett-e az üres érték (optional paraméter, default: false)
 */
function checkClass(obj, expectedClass, undefinedAllowed = false) {
    if (obj === null || obj === undefined) {
        if (!undefinedAllowed) {
            throw new Error('Failed classCheck! Undefined function parameter!');
        }
        return;
    }

    const className = getClassName(obj);
    if (className !== expectedClass) {
        throw new Error(`Unexpected function parameter type: ${className}. Function only accepts ${expectedClass}`);
    }
}