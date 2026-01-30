import { Constants } from "../appdata/Constants.js";

const NUMBER_FORMAT_OBJECT = new Intl.NumberFormat('en-US');

/**
 * A megadott számú tizedesjegyre kerekíti a paraméterül kapott számot.
 * 
 * @param {number} number a kerekítenivaló szám 
 * @param {number} decimals kívánt tizedesjegyek száma
 * @returns {number} Kerekített szám
 */
function roundNumber(number, decimals) {
    const x = 10 ** decimals;
    return Math.round(number * x) / x;
}


/**
 * Visszaadja a paraméterül kapott számot formázva.
 * 
 * @param {*} num a formáznivaló szám
 * @returns {string} formázott szám.
 */
function formatNumber(num) {
    if (!num) return num;
    if (typeof num !== Constants.classNames.number) return num;
    return NUMBER_FORMAT_OBJECT.format(num).replaceAll(",", " ");
}

/**
 * Visszaadja a paraméterül kapott array véletlenszerű elemét
 * 
 * @param {*} array paraméter array
 * @returns {*} Véletlenszerű elem
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Matematikai segítő függvények
 */
export const MathTools = {
    roundNumber,
    formatNumber,
    randomChoice
};