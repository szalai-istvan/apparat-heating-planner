class PanelContext {
    #cachedSelection = null;
    #selectedPanel = null;
    #panels = [];

    constructor() {}

    // public
    addPanel(type) {
        if (this.#selectedPanel && this.#selectedPanel.isSelectedForDrag()) {
            this.#selectedPanel.setType(type);
        } else {
            const panel = new Panel(type);
            this.#panels.push(panel);
            tooltip.panelAdded();    
        }
    }

    select(panel) {
        if (panel === this.#selectedPanel) {
            panel.selectForDrag();
            tooltip.panelSelectedForDrag();
            return;
        }
        this.deselect({selectedObject: undefined, skipValidation: false});

        panel.select();
        this.#selectedPanel = panel;
        tooltip.panelSelected();
    }

    deselect({selectedObject, skipValidation}) {
        if (this.#selectedPanel) {
            const successfulDeselect = this.#selectedPanel.deselect(skipValidation);
            if (!successfulDeselect) {
                return;
            }

            if (selectedObject !== this.#selectedPanel) {
                this.#selectedPanel = null;
            }
        }
    }

    checkForSelection() {
        if (this.#cachedSelection) {
            return this.#cachedSelection;
        }

        const selection = this.#panels.filter(p => p.pointIsInsideText());
        const panel = selection[0];
        if (panel) {
            if (panel !== this.#selectedPanel) {
                tooltip.panelHovered();
            }
            this.#cachedSelection = panel;
            return panel;
        }
        tooltip.panelUnhovered();
    }

    clearSelectionCache() {
        this.#cachedSelection = null;
    }

    removeSelected() {
        const panel = this.#selectedPanel;
        if (panel) {
            panel.remove();
            this.#selectedPanel = undefined;
            this.#panels = this.#panels.filter(r => r !== panel);
            selectionContext.deselect();
            tooltip.clearCursorTooltip();
        }
    }

    rotateSelected() {
        const panel = this.#selectedPanel;
        if (panel) {
            panel.rotate();
        }
    }

    addToSelectedGroup() {
        if (this.#selectedPanel) {
            this.#selectedPanel.addToGroup();
        }
    }

    removeFromSelectedGroup() {
        if (this.#selectedPanel) {
            this.#selectedPanel.removeFromGroup();
        }
    }

    hasSelectedPanel() {
        return Boolean(this.#selectedPanel);
    }

    clear() {
        this.#panels.forEach(panel => panel.remove());
        tooltip.clearCursorTooltip();
        this.#panels = [];
        selectionContext.deselect();
    }

    calculateQuotePanelArray() {
        let quotePanelArray = [];
        for (let panel of this.#panels) {
            quotePanelArray = [...quotePanelArray, ...panel.calculateQuotePanelArray()];
        }
        return quotePanelArray;
    }

    thereArePanels() {
        return this.#panels.length > 0;
    }
}

const panelContext = new PanelContext();