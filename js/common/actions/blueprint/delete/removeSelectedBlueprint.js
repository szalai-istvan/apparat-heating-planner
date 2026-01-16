/**
 * Eltávolítja a kiválasztott tervrajzot.
 * 
 * @returns {undefined}
 */
function removeSelectedBlueprint() {
    if (!selectedBlueprint) {
        return;
    }

    elementStore.remove(selectedBlueprint);
    recalculateBlueprintPositions();

    if (elementStore.blueprints.length === 0) {
        clearScaling();
    }
}