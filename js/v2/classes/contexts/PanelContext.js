class PanelContext {
    cachedSelection = null;
    selectedPanel = null;
    panels = [];

    constructor() {}

    createOrReplacePanel(type) {
        if (this.selectedPanel && this.selectedPanel.isSelectedForDrag()) {
            this.selectedPanel.setType(type);
        } else {
            const panel = new Panel(type);
            this.panels.push(panel);
            tooltip.panelAdded();
            selectionContext.selectObject(panel);
        }
    }

    select(panel = undefined) {
        panel = panel || this.checkForSelection();
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

    tryToDeselect() {
        if (!this.selectedPanel) {
            return;
        }

        const successfulDeselect = this.selectedPanel.deselect();
        if (successfulDeselect) {
            this.selectedPanel = null;
        }
        return successfulDeselect;
    }

    removeSelected() {
        const panel = this.selectedPanel;
        if (panel) {
            panel.remove();
            this.panels = this.panels.filter(r => r !== panel);
            this.selectedPanel = undefined;
            tooltip.clearCursorTooltip();
        }
    }

    checkForSelection() {
        if (this.cachedSelection) {
            return this.cachedSelection;
        }

        const selection = this.panels.filter(p => p.pointIsInsideText());
        const panel = selection[0];
        if (panel) {
            if (panel !== this.selectedPanel) {
                tooltip.panelHovered();
            }
            this.cachedSelection = panel;
            return panel;
        }
        tooltip.panelUnhovered();
    }

    clearSelectionCache() {
        this.cachedSelection = null;
    }

    // Context specific public methods
    clear() {
        this.panels.forEach(panel => panel.remove());
        tooltip.clearCursorTooltip();
        this.panels = [];
        selectionContext.deselect();
    }

    rotateSelected() {
        const panel = this.selectedPanel;
        if (panel) {
            panel.rotate();
        }
    }

    addToSelectedGroup() {
        if (this.selectedPanel) {
            this.selectedPanel.addToGroup();
        }
    }

    removeFromSelectedGroup() {
        if (this.selectedPanel) {
            this.selectedPanel.removeFromGroup();
        }
    }

    hasSelectedPanel() {
        return Boolean(this.selectedPanel);
    }

    calculateQuotePanelArray() {
        let quotePanelArray = [];
        for (let panel of this.panels) {
            quotePanelArray = [...quotePanelArray, ...panel.calculateQuotePanelArray()];
        }
        return quotePanelArray;
    }

    thereArePanels() {
        return this.panels.length > 0;
    }
}

const panelContext = new PanelContext();