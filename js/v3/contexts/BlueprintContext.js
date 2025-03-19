class BlueprintContext {
    blueprints = [];

    constructor() {}

    createBlueprint(data) {
        this.blueprints.push(new Blueprint(data, {x: 0, y: 0}));
    }

    clearBlueprints() {
        this.blueprints.forEach(blueprint => BlueprintManager.remove(blueprint));
        this.blueprints = [];
    }

    blueprintDataIsPresent() {
        const blueprints = this.blueprints;

        if (blueprints.length === 0) {
            return false;
        }

        return blueprints.filter(blueprint => BlueprintManager.dataIsPresent(blueprint)).length > 0;
    }

    getSizeData() {
        return undefined; // TODO
    }
}

const blueprintContext = new BlueprintContext();