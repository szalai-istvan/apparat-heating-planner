class Blueprint {
    #data;

    constructor() {
        renderer.register(this);
    }

    // public
    setBlueprintData(data) {
        this.#data = data;
        tooltip.fileIsUploaded();
    }

    draw() {
        const data = this.#data
        if (!data) {
            return;
        }
        const topLeftCoordinates = this.#getTopLeftCoordinates();

        image(data,
            topLeftCoordinates.x,
            topLeftCoordinates.y,
            data.width,
            data.height
        );
    }

    dataIsPresent() {
        return Boolean(this.#data);
    }

    getSizeData() {
        const data = this.#data
        if (!data) {
            return;
        }

        const p = this.#getTopLeftCoordinates();
        return { x: p.x, y: p.y, w: data.width, h: data.height };
    }

    // private
    #getTopLeftCoordinates() {
        const data = this.#data
        if (!data) {
            return;
        }
        return {
            x: - 0.5 * data.width,
            y: - 0.5 * data.height
        };
    }
}

const blueprint = new Blueprint();