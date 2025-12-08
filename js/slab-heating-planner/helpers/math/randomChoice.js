/**
 * Visszaadja a paraméterül kapott array véletlenszerű elemét
 * 
 * @param {*} array paraméter array
 * @returns {*} Véletlenszerű elem
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}