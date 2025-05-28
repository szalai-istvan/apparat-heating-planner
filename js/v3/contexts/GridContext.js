class GridContext {
    seed = undefined;
    gridResolutionPixel = undefined;

    constructor() {}

    refreshGridResolution() {
        const ratio = scaleContext.pixelsPerMetersRatio;
        if (!ratio) {
            this.gridResolutionPixel = undefined;
        }

        this.gridResolutionPixel = GRID_RESOLUTION_METER * ratio;
    }

    setSeed(seed) {
        if (!seed) {
            return;
        }

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
        const gridResolutionPixel = this.gridResolutionPixel;

        if (!seed) {
            return p;
        }

        const x = seed.x + Math.round((p.x - seed.x) / gridResolutionPixel) * gridResolutionPixel;
        const y = seed.y + Math.round((p.y - seed.y) / gridResolutionPixel) * gridResolutionPixel;

        return {
            x: x,
            y: y
        };
    }
}

const gridContext = new GridContext();