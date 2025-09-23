const NUMBER_FORMAT_OBJECT = new Intl.NumberFormat('en-US');

/**
 * Visszaadja a paraméterül kapott számot formázva.
 * 
 * @param {*} num a formáznivaló szám
 * @returns {string} formázott szám.
 */
function formatNumber(num) {
    if (!num) return num;
    if (typeof num !== "number") return num;
    return NUMBER_FORMAT_OBJECT.format(num).replaceAll(",", " ");
}