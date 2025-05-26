class GridContext {
    seed = undefined;

    constructor() {}

    setSeed(seed) {
        if (this.seed) {
            throw new Error('Attempt to double set seed!');
        }

        this.seed = {
            x: seed.x,
            y: seed.y
        };
    }

    removeSeed() {
        this.seed = undefined;
    }

    closestGridPoint(p) {
        const seed = this.seed;

        if (!seed) {
            return p;
        }

        const x = seed.x + Math.round((p.x - seed.x) / GRID_RESOLUTION_METER) * GRID_RESOLUTION_METER;
        const y = seed.y + Math.round((p.y - seed.y) / GRID_RESOLUTION_METER) * GRID_RESOLUTION_METER;

        return {
            x: x,
            y: y
        };
    }
}

const gridContext = new GridContext();