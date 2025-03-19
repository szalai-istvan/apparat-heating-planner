class SelectionContext {
    lastSelectingContext = null;
    selectedObject = null;
    contexts = [];

    constructor() {
        this.contexts = [panelContext, roomContext];
    }


    searchSelectableObject() {
        const contexts = this.contexts;

        let selectedObject = undefined;
        let i = 0;
        while ((!selectedObject) && contexts[i]) {
            selectedObject = this.runSelection(contexts[i++]);
        }
    }

    selectObject(obj) {
        const successfulDeselect = this.tryToDeselect();
        if (!successfulDeselect) {
            return;
        }

        this.selectedObject = obj;
        const className = getClassName(obj);
        if (className === 'Panel') {
            this.lastSelectingContext = panelContext;
        } else if (className === 'Room') {
            this.lastSelectingContext = roomContext;
        } else {
            throw new Error(`Unexpected class of selected object: ${className}`);
        }

        this.lastSelectingContext.select(obj);
    }

    tryToDeselect() {
        const lastSelectingContext = this.lastSelectingContext;
        if (!lastSelectingContext) {
            return true;
        }

        const successfulDeselect = lastSelectingContext.tryToDeselect();
        if (successfulDeselect) {
            this.selectedObject = null;
        }
        return successfulDeselect;
    }

    removeSelected() {
        if (!this.lastSelectingContext) {
            return;
        }

        this.lastSelectingContext.removeSelected();
        this.tryToDeselect();
    }

    clearSelectionCache() {
        this.contexts.forEach(context => context.clearSelectionCache());
    }

    checkForSelection() {
        this.contexts.forEach(context => context.checkForSelection());
    }


    runSelection(context) {
        const selectableObject = context.checkForSelection();
        if (selectableObject) {
            if (context !== this.lastSelectingContext) {
                const successfulDeselect = this.lastSelectingContext.tryToDeselect();
                if (successfulDeselect) {
                    context.select();
                    this.lastSelectingContext = context;
                    this.selectedObject = selectableObject
                    return selectableObject;
                }
            } else {
                context.select();
                this.selectedObject = selectableObject
                return selectableObject;
            }
        }
        return undefined;
    }
}

const selectionContext = new SelectionContext();