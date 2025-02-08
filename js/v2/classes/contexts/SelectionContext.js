class SelectionContext {
    #lastSelectingContext = null;
    #selectedObject = null;
    #contexts = [];

    constructor() {
        this.#contexts = [panelContext, roomContext];
    }

    // public
    select() {
        const contexts = this.#contexts;

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
        const className = getClassName(obj);
        if (className === 'Panel') {
            this.#lastSelectingContext = panelContext;
        } else if (className === 'Room') {
            this.#lastSelectingContext = roomContext;
        }
        this.#lastSelectingContext.select(obj);
    }

    deselect(selectedObject) {
        const lastSelectingContext = this.#lastSelectingContext;
        if (lastSelectingContext) {
            lastSelectingContext.deselect(selectedObject);
            this.#selectedObject = null;
        }
    }

    isAnyThingSelected() {
        return Boolean(this.#selectedObject);
    }
    
    // private
    #runSelection(context) {
        const selectableObject = context.checkForSelection();
        if (selectableObject) {
            this.deselect(selectableObject);
            context.select(selectableObject);
            this.#lastSelectingContext = context;
            return selectableObject;
        }
        return undefined;
    }
}

const selectionContext = new SelectionContext();