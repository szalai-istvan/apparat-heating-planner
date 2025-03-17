import { getClassName } from "../../helpers/helpers";
import { Renderable, Selector } from "../../types/types";
import { panelSelector } from "./PanelSelector";
import { roomSelector } from "./RoomSelector";

export class SelectionContext {
    private lastSelectingSelector: Selector<any> | null = null;
    private selectedObject: Renderable | null = null;
    private selectors: Selector<any>[] = [];

    constructor() {
    }

    // public
    public registerSelector(selector: Selector<any>): void {
        this.selectors.push(selector);
    }

    public searchSelectableObject(): void {
        const contexts = this.selectors;

        let selectedObject = undefined;
        let i = 0;
        while ((!selectedObject) && contexts[i]) {
            selectedObject = this.runSelection(contexts[i++]);
        }
    }

    public selectObject(obj: Renderable): void {
        this.deselect();
        this.selectedObject = obj;
        const className = getClassName(obj);
        if (className === 'Panel') {
            this.lastSelectingSelector = panelSelector;
        } else if (className === 'Room') {
            this.lastSelectingSelector = roomSelector;
        } else {
            throw new Error(`Unexpected class of selected object: ${className}`);
        }

        this.lastSelectingSelector.select(obj);
    }

    public deselect(): boolean {
        const lastSelectingSelector = this.lastSelectingSelector;
        if (lastSelectingSelector) {
            const successfulDeselect = lastSelectingSelector.tryToDeselect();
            if (successfulDeselect) {
                this.selectedObject = null;
            }
            return successfulDeselect;
        }
        return false;
    }

    public removeSelected(): void {
        if (this.lastSelectingSelector) {
            this.lastSelectingSelector.removeSelected();
        }
        this.deselect();
    }

    public isAnyThingSelected(): boolean {
        return Boolean(this.selectedObject);
    }

    public clearSelectionCache(): void {
        this.selectors.forEach(selector => selector.clearSelectionCache());
    }

    public checkForSelection(): void {
        this.selectors.forEach(selector => selector.checkForSelection());
    }
    
    // private
    private runSelection(selector: Selector<any>): Renderable | null {
        const selectableObject = selector.checkForSelection();
        if (selectableObject) {
            if (selector !== this.lastSelectingSelector && this.lastSelectingSelector) {
                const successfulDeselect = this.lastSelectingSelector.tryToDeselect();
                if (successfulDeselect) {
                    selector.select();
                    this.lastSelectingSelector = selector;
                    this.selectedObject = selectableObject
                    return selectableObject;        
                }
            }
        }
        return null;
    }
}

export const selectionContext = new SelectionContext();