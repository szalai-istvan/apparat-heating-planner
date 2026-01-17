/** @type {Function} */
let projectSpecificDeselectFunction = (className) => {};

/**
 * Megkísérli megszűntetni a kijelölt objektum kiválasztását és visszaküldi, hogy sikerült-e.
 * Ez a függvény jobb klikknél és objektum választásnál fut le. A sikertelenséget elbukó validációk okozhatják.
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectObject() {
    const selected = selectedObject;
    if (selected === null || selected === undefined) {
        return true;
    }

    const className = getClassName(selected);
    let successfulDeselect;
    if (className === CLASS_ROOM) {
        successfulDeselect = deselectRoom();
    } else if (className === CLASS_BLUEPRINT) {
        successfulDeselect = deselectBlueprint();
    } else {
        successfulDeselect = projectSpecificDeselectFunction(className);
    }

    if (successfulDeselect) {
        selectedObject = null;
    }

    return successfulDeselect;
}

/**
 * Beállítja a projekt specifikus választás megszüntető függvény értékét.
 * A paraméterül adott függvénynek string paramétert kell elfogadnia, és undefined értéket kell visszaadnia.
 * (className: string) => undefined
 * 
 * @param {Function} func 
 * @returns {undefined}
 */
function setProjectSpecificDeselectFunction(func) {
    projectSpecificDeselectFunction = func;
}