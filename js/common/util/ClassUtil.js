/**
 * Megállapítja egy paraméterül kapott adat típusát
 * 
 * @param {*} obj
 * @returns {string} A paraméterül kapott adat típusának neve
 */
function getClassName(obj) {
    if (!obj || typeof(obj) !== "object") {
        return typeof(obj);
    }

    return obj.constructor.name;
}

/**
 * Osztályokkal kapcsolatos utility függvények gyűjteménye.
 */
export const ClassUtil = {
    getClassName
};