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
    if (!topLeftCoordinates) return;

    push();

    imageMode(CENTER);
    rectMode(CENTER);
    translate(blueprint.centerPosition.x, blueprint.centerPosition.y);
    rotate(getRotationAngle(blueprint));

    image(data,
        0,
        0,
        data.width,
        data.height
    );

    if (blueprint.isSelected) {
        stroke('red');
        strokeWeight(5);
        noFill();
        rect(0, 0, data.width, data.height);
    }

    pop();
}

/** @param {Blueprint} blueprint */
function getBlueprintTopLeftCoordinates(blueprint) {
    const data = blueprint.data;

    if (!blueprint.topLeftPosition) {
        if (data.width > 1 && data.height > 1) {
            blueprint.topLeftPosition = {
                x: - 0.5 * data.width,
                y: - 0.5 * data.height
            };

            blueprint.centerPosition = createPoint(
                blueprint.topLeftPosition.x + blueprint.data.width / 2,
                blueprint.topLeftPosition.y + blueprint.data.height / 2);

        } else {
            return undefined;
        }
    } else if (!blueprint.centerPosition) {
        blueprint.centerPosition = createPoint(
            blueprint.topLeftPosition.x + blueprint.data.width / 2,
            blueprint.topLeftPosition.y + blueprint.data.height / 2);
    }

    return blueprint.topLeftPosition;
}

/**
 * Megállapítja a tervrajz teljes elforgatottságát.
 * 
 * @param {Blueprint} blueprint 
 * @returns {Number}
 */
function getRotationAngle(blueprint) {
    let angleDeg = blueprint.angleDeg;

    if (modalIsOpen(rotateBlueprintDialog) && blueprint === selectedBlueprint) {
        angleDeg -= rotateBlueprintDialogInput.value;
    }
    return angleDeg;
}