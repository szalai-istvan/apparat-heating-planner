class SelectionContext {
    #lastSelectingContext = null;
    #selectedObject = null;

    constructor() {}

    // public
    select() {
        const contexts = [panelContext, roomContext];

        let selectedObject = undefined;
        let i = 0;
        while ((!selectedObject) && contexts[i]) {
            selectedObject = this.#runSelection(contexts[i++]);
        }

        if (selectedObject) {
            this.#selectedObject = selectedObject;
        }
    }

    selectObject(obj) {
        this.deselect();
        this.#selectedObject = obj;
        const className = obj.constructor.name;
        if (className === 'Panel') {
            this.#lastSelectingContext = panelContext;
        } else if (className === 'Room') {
            this.#lastSelectingContext = roomContext;
        }
        this.#lastSelectingContext.select(obj);
    }

    deselect() {
        const lastSelectingContext = this.#lastSelectingContext;
        if (lastSelectingContext) {
            lastSelectingContext.deselect();
            this.#selectedObject = null;
        }
    }

    // private
    #runSelection(context) {
        const selectableObject = context.checkForSelection();
        if (selectableObject) {
            context.select(selectableObject);
            this.#lastSelectingContext = context;
            return selectableObject;
        }
        return undefined;
    }
}

const selectionContext = new SelectionContext();