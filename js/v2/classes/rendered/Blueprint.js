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