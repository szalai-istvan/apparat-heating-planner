class PanelContext {
    cachedSelection = null;
    selectedPanel = null;
    panels = [];

    constructor() {}

    createOrReplacePanel(type) {
        if (this.selectedPanel && this.selectedPanel.isSelectedForDrag) {
            PanelManager.setType(this.selectedPanel, type);
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
            PanelSelector.selectForDrag(panel);
            tooltip.panelSelectedForDrag();
            return;
        }

        const successfulDeselect = this.tryToDeselect();
        if (successfulDeselect) {
            PanelSelector.select(panel);
            this.selectedPanel = panel;
            tooltip.panelSelected();    
        }
    }

    tryToDeselect() {
        if (!this.selectedPanel) {
            return true;
        }

        const successfulDeselect = PanelSelector.tryToDeselect(this.selectedPanel);
        if (successfulDeselect) {
            this.selectedPanel = null;
        }
        return successfulDeselect;
    }

    removeSelected() {
        const panel = this.selectedPanel;
        if (panel) {
            PanelSelector.remove(panel);
            this.panels = this.panels.filter(r => r !== panel);
            this.selectedPanel = undefined;
            tooltip.clearCursorTooltip();
        }
    }

    checkForSelection() {
        if (this.cachedSelection) {
            return this.cachedSelection;
        }

        const selection = this.panels.filter(p => PanelManager.mouseCursorIsInsideText(p));
        const panel = selection[0];
        if (panel) {
            if (panel !== this.selectedPanel) {
                tooltip.panelHovered();
            }
            this.cachedSelection = panel;
            return panel;
        }

        tooltip.panelUnhovered();
        return undefined;
    }

    clearSelectionCache() {
        this.cachedSelection = null;
    }

    clear() {
        this.panels.forEach(panel => PanelSelector.remove(panel));
        tooltip.clearCursorTooltip();
        this.panels = [];
        selectionContext.tryToDeselect();
    }

    tryToRotateSelected() {
        const panel = this.selectedPanel;
        if (panel) {
            PanelManager.rotate(panel);
        }
    }

    tryToAddToSelectedGroup() {
        if (this.selectedPanel) {
            PanelManager.addToGroup(this.selectedPanel);
        }
    }

    removeFromSelectedGroup() {
        if (this.selectedPanel) {
            PanelManager.removeFromGroup(this.selectedPanel);
        }
    }

    hasSelectedPanel() {
        return Boolean(this.selectedPanel);
    }

    calculateQuotePanelArray() {
        let quotePanelArray = [];
        for (let panel of this.panels) {
            quotePanelArray = [...quotePanelArray, ...QuotePanel.calculateQuotePanelArray(panel)];
        }
        return quotePanelArray;
    }

    thereArePanels() {
        return this.panels.length > 0;
    }
}

const panelContext = new PanelContext();