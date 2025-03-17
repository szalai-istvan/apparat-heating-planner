import { Selector } from "../../types/types";
import { Panel } from "../renderable/Panel";
import { tooltip } from "../renderable/Tooltip";
import { selectionContext } from "./SelectionContext";

export class PanelSelector implements Selector<Panel> {
    private cachedSelection: Panel | null;
    private selectedPanel: Panel | null;
    private panels: Panel[] = [];

    constructor() {
        selectionContext.registerSelector(this);
    }

    public create(type: string): boolean {
        if (this.selectedPanel && this.selectedPanel.selectedForDrag()) {
            this.selectedPanel.setType(type);
        } else {
            const panel = new Panel(type);
            this.panels.push(panel);
            tooltip.panelAdded();
            selectionContext.selectObject(panel);
        }
        return true;
    }

    public select(panel?: Panel): void {
        panel = panel || this.checkForSelection() || undefined;
        if (!panel) return;

        if (panel === this.selectedPanel) {
            panel.selectForDrag();
            tooltip.panelSelectedForDrag();
            return;
        }

        this.tryToDeselect();
        panel.select();
        this.selectedPanel = panel;
        tooltip.panelSelected();
    }

    public tryToDeselect(): boolean {
        if (!this.selectedPanel) {
            return true;
        }

        const successfulDeselect = this.selectedPanel.tryToDeselect();
        if (successfulDeselect) {
            this.selectedPanel = null;
        }
        return successfulDeselect;
    }

    public removeSelected(): void {
        const panel = this.selectedPanel;
        if (panel !== null) {
            panel.remove();
            this.panels = this.panels.filter(r => r !== panel);
            this.selectedPanel = null;
            tooltip.clearCursorTooltip();
        }
    }

    public checkForSelection(): Panel | null {
        if (this.cachedSelection) {
            return this.cachedSelection;
        }

        const selection = this.panels.filter(p => p.cursorIsInsideText());
        const panel = selection[0];
        if (panel) {
            if (panel !== this.selectedPanel) {
                tooltip.panelHovered();
            }
            this.cachedSelection = panel;
            return panel;
        }
        tooltip.panelUnhovered();
        return null;
    }

    public clearSelectionCache(): void {
        this.cachedSelection = null;
    }

    public clear(): void {
        this.panels.forEach(panel => panel.remove());
        tooltip.clearCursorTooltip();
        this.panels = [];
        selectionContext.deselect();
    }

    public rotateSelected(): void {
        const panel = this.selectedPanel;
        if (panel) {
            panel.rotate();
        }
    }

    public addToSelectedGroup(): void {
        if (this.selectedPanel) {
            this.selectedPanel.addToGroup();
        }
    }

    public removeFromSelectedGroup(): void {
        if (this.selectedPanel) {
            this.selectedPanel.removeFromGroup();
        }
    }

    public hasSelectedPanel(): boolean {
        return Boolean(this.selectedPanel);
    }

    public calculateQuotePanelArray(): QuotePanel[] {
        let quotePanelArray: QuotePanel[] = [];
        for (let panel of this.panels) {
            quotePanelArray = [...quotePanelArray, ...panel.calculateQuotePanelArray()];
        }
        return quotePanelArray;
    }

    public thereArePanels(): boolean {
        return this.panels.length > 0;
    }
}

export const panelSelector = new PanelSelector();