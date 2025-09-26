/**
 * Rajz hozzáadása a rajzlaphoz.
 * 
 * @param {*} data adatcsomag
 * @returns {undefined}
 */
function createBlueprint(data) {
    const sizeData = getBlueprintSizeData();
    if (!sizeData) {
        elementStore.register(new Blueprint(data, undefined));
        screenSumDrag = createPoint(0, 0);
    } else {
        let topLeftCoordinates = createPoint(sizeData.x + sizeData.w, sizeData.y);
        const blueprint = new Blueprint(data, topLeftCoordinates);
        elementStore.register(blueprint);
        tryUntilSuccessfulRecalculatePositions(blueprint);
    }
}

/** @param {Blueprint} blueprint */
function tryUntilSuccessfulRecalculatePositions(blueprint) {
    console.log(blueprint);
    if (blueprint.data.width > 1 && blueprint.data.height > 1) {
        recalculateBlueprintPositions();
        screenSumDrag = { x: -blueprint.centerPosition.x, y: 0 };
    } else {
        setTimeout(() => tryUntilSuccessfulRecalculatePositions(blueprint), 50);
    }
}

function getBlueprintSizeData() {
    if (!elementStore.blueprints.length) {
        return undefined;
    }

    if (!elementStore.blueprints.map(bp => bp.topLeftPosition).filter(x => x).length) {
        return;
    }

    const sizeDatas = elementStore.blueprints.map(bp => getSizeData(bp));
    return {
        x: - sizeDatas[0].w / 2,
        y: - sizeDatas[0].h / 2,
        w: sizeDatas.map(s => s.w).reduce(sumFunction),
        h: sizeDatas.map(s => s.h).reduce(maximumFunction)
    }
}

function getSizeData(blueprint) {
    const data = blueprint.data;

    return { x: blueprint.topLeftPosition.x, y: blueprint.topLeftPosition.y, w: data.width, h: data.height };
}