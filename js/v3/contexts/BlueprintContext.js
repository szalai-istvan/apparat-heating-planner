class BlueprintContext {
    blueprints = [];

    constructor() { }

    createBlueprint(data) {
        const sizeData = blueprintContext.getSizeData();
        if (!sizeData) {
            this.blueprints.push(new Blueprint(data, undefined));
            screenContext.sumDrag = {x: 0, y: 0};
        } else {
            let topLeftCoordinates = {
                x: sizeData.x + sizeData.w,
                y: sizeData.y
            };
            this.blueprints.push(new Blueprint(data, topLeftCoordinates));
            screenContext.sumDrag = {x: -topLeftCoordinates.x, y: 0};
        }
    }

    clearBlueprints() {
        this.blueprints.forEach(blueprint => BlueprintManager.remove(blueprint));
        this.blueprints = [];
        scaleContext.clear();
    }

    blueprintDataIsPresent() {
        const blueprints = this.blueprints;

        if (blueprints.length === 0) {
            return false;
        }

        return blueprints.filter(blueprint => BlueprintManager.dataIsPresent(blueprint)).length > 0;
    }

    getSizeData() {
        if (!this.blueprints.length) {
            return undefined;
        }

        const sizeDatas = this.blueprints.map(bp => BlueprintManager.getSizeData(bp));
        return { 
            x: - sizeDatas[0].w / 2, 
            y: - sizeDatas[0].h / 2, 
            w: sizeDatas.map(s => s.w).reduce(sumFunction),
            h: sizeDatas.map(s => s.h).reduce(sumFunction)
        }
    }
}

const blueprintContext = new BlueprintContext();