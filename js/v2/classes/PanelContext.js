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
        return null; // TODO
    }
}

const panelContext = new PanelContext();