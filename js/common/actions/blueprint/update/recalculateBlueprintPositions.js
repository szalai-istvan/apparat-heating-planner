/**
 * Újraszámolja az összes tervrajz pozícióját
 * 
 */
function recalculateBlueprintPositions() {
    const blueprints = elementStore.blueprints;
    let centerPoint = createPoint(0, 0);

    if (blueprints.length === 1) {
        blueprints[0].centerPosition = createPoint(0, 0);
    } else {
        let index = 1;
        while (index < blueprints.length) {
            const previousBlueprint = blueprints[index - 1];
            const angleRad1 = toRadians(previousBlueprint.angleDeg);
            const w1 = previousBlueprint.data.width;
            const h1 = previousBlueprint.data.height;

            const blueprint = blueprints[index];
            const angleRad2 = toRadians(blueprint.angleDeg);
            const w2 = blueprint.data.width;
            const h2 = blueprint.data.height;

            const width1 = Math.abs(w1 * Math.cos(angleRad1)) + Math.abs(h1 * Math.sin(angleRad1));
            const width2 = Math.abs(w2 * Math.cos(angleRad2)) + Math.abs(h2 * Math.sin(angleRad2));
            centerPoint = createPoint(centerPoint.x + (width1 + width2) / 2, 0);

            blueprint.centerPosition = centerPoint;
            index++;
        }
    }
}