class Renderer {
    #objectsToRender = [];

    constructor() {}

    // public
    register(obj) {
        const className = this.#className(obj);
        if (!className) {
            return;
        }
        this.#objectsToRender.push(obj);
    }

    render() {
        const renderObjects = this.#getRenderObjects();
        renderObjects.filter(x => x).forEach(x => x.draw());
    }

    // private
    #className(obj) {
        if (!obj || typeof(obj) !== 'object') {
            return null;
        }

        return obj.constructor.name;
    }

    #getRenderObjects() {
        return [...this.#objectsToRender];
    }
}

const renderer = new Renderer();