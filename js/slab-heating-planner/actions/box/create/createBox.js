/**
 * Létrehoz egy doboz objektumot és visszaadja
 * 
 * @param {boolean} addToGroup, hozzáadjuk-e csoporthoz
 * @returns {Box} a létrehozott doboz objektum
 */
function createBox(addToGroup) {
    const box = new Box();

    if (addToGroup) {
        attachToSelectedBoxGroup(box);
    }

    return box;
}