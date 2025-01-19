class PanelContext {
    #selectedPanel = null;
    #panels = [];

    constructor() {}

    addPanel(type) {
        const panel = new Panel(type);
        this.#panels.push(panel);
        selectionContext.selectObject(panel);
    }

    select(panel) {
        this.deselect();

        panel.select();
        this.#selectedPanel = panel;
    }

    deselect() {
        if (this.#selectedPanel) {
            this.#selectedPanel.deselect();
            this.#selectedPanel = null;
        }
    }

    checkForSelection() {
        const selection = this.#panels.filter(p => p.pointIsInsideText());
        const panel = selection[0];
        if (panel) {
            return panel;
        }
    }
}

const panelContext = new PanelContext();