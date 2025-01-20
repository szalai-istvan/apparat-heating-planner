class PanelContext {
    #selectedPanel = null;
    #panels = [];

    constructor() {}

    addPanel(type) {
        const panel = new Panel(type);
        this.#panels.push(panel);
    }

    select(panel) {
        if (panel === this.#selectedPanel) {
            panel.selectForDrag();
            return;
        }
        this.deselect();

        panel.select();
        this.#selectedPanel = panel;
    }

    deselect(contextReset = true) {
        if (this.#selectedPanel) {
            this.#selectedPanel.deselect();
            if (contextReset) {
                this.#selectedPanel = null;
            }
        }
    }

    checkForSelection() {
        const selection = this.#panels.filter(p => p.pointIsInsideText());
        const panel = selection[0];
        if (panel) {
            return panel;
        }
    }

    removeSelected() {
        const panel = this.#selectedPanel;
        if (panel) {
            panel.remove();
            this.#panels = this.#panels.filter(r => r !== panel);
            selectionContext.deselect();
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
}

const panelContext = new PanelContext();