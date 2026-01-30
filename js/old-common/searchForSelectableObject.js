/** @type {Function[]} */
const selectableObjectSearchSteps = [];

/**
 * Kiválasztható objektum keresése, amely a bal egérgomb elengedésekor fut le.
 * 
 * @returns {undefined}
 */
function searchSelectableObject() {
    for (let searchFunction of selectableObjectSearchSteps) {
        const searchFunctionResult = searchFunction();
        if (searchFunctionResult) {
            selectedObject = searchFunctionResult;
            return searchFunctionResult;
        }
    }

    return undefined;
}

/**
 * Beállítja az objektum választás lépéseit.
 * 
 * @param {Function[]} steps 
 * @returns {undefined}
 */
function setSelectableObjectSearchStep(steps) {
    if (selectableObjectSearchSteps.length > 0) {
        throw new Error('selectableObjectSearchSteps can only be set once!');
    }

    for (let step of steps) {
        selectableObjectSearchSteps.push(step);
    }
}

// legyenek lépések, a common lépések ebben a fájlban definiálva, és a user egy függvényhívással beállítja, hogy mely lépéseket és milyen sorrendben szeretne végrehajtani.

/**
 * Megkeresi és visszaadja a kiválasztható tervrajzot.
 * 
 * @returns {Blueprint}
 */
function searchForSelectableBlueprint() {
    const selectedBlueprint = selectBlueprint();
    if (selectedBlueprint) {
        selectedObject = selectedBlueprint;
        return selectedBlueprint;
    }
}

/**
 * Megkeresi és visszaadja a kiválasztható szobát.
 * 
 * @returns {Room}
 */
function searchForSelectableRoom() {
    const selectedRoom = selectRoom();
    if (selectedRoom) {
        selectedObject = selectedRoom;
        return selectedRoom;
    }
}