/**
 * Ellenőrzi, hogy van-e feltöltött tervrajz adat.
 * 
 * @returns {boolean} true, ha van feltöltött tervrajz. Egyéb esetben false.
 */
function blueprintDataIsPresent() {
    const blueprints = elementStore.blueprints;

    if (blueprints.length === 0) {
        return false;
    }

    return blueprints.filter(blueprint => blueprint.data).length > 0;
}