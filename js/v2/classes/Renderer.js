class Renderer {
    #bluePrint = null;
    #scaleContext = null;
    #tooltip = null;
    #panels = [];
    #rooms = [];
    #buttons = [];

    constructor() {}

    // public
    register(obj) {
        const className = getClassName(obj);
        if (!className) {
            return;
        }

        if (className === 'Blueprint') {
            this.#bluePrint = obj;
        } else if (className === 'Panel') {
            this.#panels.push(obj);
        } else if (className === 'Room') {
            this.#rooms.push(obj);
        } else if (className === 'ScaleContext') {
            this.#scaleContext = obj;
        } else if (className === 'ButtonWrapper') {
            this.#buttons.push(obj);
        } else if (className === 'Tooltip') {
            this.#tooltip = obj;
        } else {
            throw new Error(`Unexpected render type: ${className}`);
        }
    }

    renderTranslatedObjects() {
        const renderObjects = this.#getTranslatedRenderObjects();
        renderObjects.filter(x => x).forEach(x => x.draw());
    }

    renderAbsolutePositionObjects() {
        const renderObjects = this.#getAbsoluteRenderObjects();
        renderObjects.filter(x => x).forEach(x => x.draw());
    }

    remove(obj) {
        const className = getClassName(obj);
        if (!className) {
            return;
        }

        if (className === 'Panel') {
            this.#panels = this.#panels.filter(x => x !== obj); 
        } else if (className === 'Room') {
            this.#rooms = this.#rooms.filter(x => x !== obj); 
        } else {
            throw new Error(`Deleting of object of type ${className} is unspecified.`);
        }
    }

    // private
    #getTranslatedRenderObjects() {
        return [this.#bluePrint, ...this.#panels, ...this.#rooms, this.#scaleContext, ...this.#buttons];
    }

    #getAbsoluteRenderObjects() {
        return [this.#tooltip];
    }
}

const renderer = new Renderer();