/** @type {Blueprint} */
let selectedBlueprint = null;
/** @type {Blueprint} */
let cachedSelectableBlueprint = null;

/**
 * Kiválasztja a tervrajzot.
 * 
 * @param {Blueprint} blueprint 
 * @returns {Blueprint}
 */
function selectBlueprint(blueprint = undefined) {
    checkClass(blueprint, CLASS_BLUEPRINT, true);

    blueprint = blueprint || checkForSelectableBlueprint();
    if (!blueprint) {
        return undefined;
    }

    if (deselectObject()) {
        blueprint.isSelected = true;
        selectedBlueprint = blueprint;
        return blueprint;
    }

    return undefined;
}

function checkForSelectableBlueprint() {
    if (cachedSelectableBlueprint) {
        return cachedSelectableBlueprint;
    }

    const selection = elementStore.blueprints.filter(bp => mouseCursorIsInsideBlueprint(bp));
    const blueprint = selection[0];
    if (blueprint) {
        cachedSelectableBlueprint = blueprint;
        return blueprint;
    }

    return undefined;
}