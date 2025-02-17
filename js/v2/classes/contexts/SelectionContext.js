class SelectionContext {
    #lastSelectingContext = null;
    #selectedObject = null;
    #contexts = [];

    constructor() {
        this.#contexts = [panelContext, roomContext];
    }

    // public
    searchSelectableObject() {
        const contexts = this.#contexts;

        let selectedObject = undefined;
        let i = 0;
        while ((!selectedObject) && contexts[i]) {
            selectedObject = this.#runSelection(contexts[i++]);
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
        } else {
            throw new Error(`Unexpected class of selected object: ${className}`);
        }

        this.#lastSelectingContext.select(obj);
    }

    deselect(selectedObject) {
        const lastSelectingContext = this.#lastSelectingContext;
        if (lastSelectingContext) {
            lastSelectingContext.deselect({selectedObject: selectedObject, skipValidation: false});
            this.#selectedObject = null;
        }
    }

    removeSelected() {
        this.#lastSelectingContext.removeSelected();
        this.deselect();
    }

    isAnyThingSelected() {
        return Boolean(this.#selectedObject);
    }
    
    // private
    #runSelection(context) {
        const selectableObject = context.checkForSelection();
        if (selectableObject) {
            if (context !== this.#lastSelectingContext) {
                this.#lastSelectingContext.deselect();
            }
            context.select();
            this.#lastSelectingContext = context;
            this.#selectedObject = selectableObject
            return selectableObject;
        }
        return undefined;
    }
}

const selectionContext = new SelectionContext();