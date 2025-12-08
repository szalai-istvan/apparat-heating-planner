/**
 * Felrajzol egy tervrajzot a rajzlapra.
 * 
 * @param {Blueprint} blueprint tervrajz adat
 * @returns {undefined}
 */
function drawBlueprint(blueprint) {
    if (getClassName(blueprint) !== CLASS_BLUEPRINT) {
        throw new Error($`Unexpected parameter type: ${getClassName(blueprint)}. Function only accepts ${CLASS_BLUEPRINT}`);
    }

    const data = blueprint.data;
    if (!data) {
        return;
    }

    const topLeftCoordinates = getBlueprintTopLeftCoordinates(blueprint);

    topLeftCoordinates && image(data,
        topLeftCoordinates.x,
        topLeftCoordinates.y,
        data.width,
        data.height
    );
}

function getBlueprintTopLeftCoordinates(blueprint) {
    const data = blueprint.data;

    if (!blueprint.topLeftPosition) {
        if (data.width > 1 && data.height > 1) {
            blueprint.topLeftPosition = {
                x: - 0.5 * data.width,
                y: - 0.5 * data.height
            };
        } else {
            return undefined;
        }
    }

    return blueprint.topLeftPosition;
}