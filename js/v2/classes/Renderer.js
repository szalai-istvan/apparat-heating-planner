class Renderer {
    #bluePrint = null;
    #scaleContext = null;
    #tooltip = null;
    #panels = [];
    #rooms = [];
    #buttons = [];
    #beams = [];

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
        } else if (className === 'StructureElementsInRoom') {
            this.#beams.push(obj);
        } else {
            throw new Error(`Attempt to register unexpected render type: ${className}`);
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
        } else if (className === 'StructureElementsInRoom') {
            this.#beams = this.#beams.filter(x => x !== obj); 
        } else {
            throw new Error(`Deleting render object of type ${className} is unspecified.`);
        }
    }

    // private
    #getTranslatedRenderObjects() {
        const StructureElementsRenderObjects = this.#rooms.map(room => room.getStructuralElementRenderObjects());
        const alignedRenders = StructureElementsRenderObjects.map(x => x.alignedBeams);
        const crossedRenders = StructureElementsRenderObjects.map(x => x.crossBeams);

        return [this.#bluePrint, ...alignedRenders, ...this.#panels, ...crossedRenders, ...this.#rooms, this.#scaleContext, ...this.#buttons];
    }

    #getAbsoluteRenderObjects() {
        return [this.#tooltip];
    }
}

const renderer = new Renderer();