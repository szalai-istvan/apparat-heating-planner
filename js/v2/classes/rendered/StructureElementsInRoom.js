class StructureElementsInRoom {
    #alignment;

    #panels = [];
    #alignedBeams = [];
    #crossBeams = [];

    constructor() {
        this.#alignment = undefined;
        renderer.register(this);
    }

    // public
    draw() {
        // TODO
    }

    addPanelGroup(panel) {
        const panelAlignment = panel.getAlignment();
        if (this.#alignment === undefined || panelAlignment === this.#alignment) {
            this.#alignment = panelAlignment;
            if (!this.#panels.includes(panel)) {
                this.#panels.push(panel);
                this.#recalculateBeams();    
            }
            return true;
        }
        return false;
    }

    removePanelGroup(panel) {
        this.#panels = this.#panels.filter(p => p !== panel);
        this.#recalculateBeams();
        if (this.#panels.length === 0) {
            this.#alignment = undefined;
        }
    }

    registerRotation(panel) {
        if (this.#alignment === undefined) {
            return true;
        }
        if (this.#panels.length < 2 && this.#panels[0] === panel) {
            this.#alignment = (panel.getAlignment() + 1) % 2;
            return true;
        }
        displayErrorMessage('A panel elforgatásának hatására egymásra merőleges panelek szerepelnének a szobában!\nMozgasson, vagy távolítson el paneleket, mielőtt elforgatja!');
        return false;
    }

    clear() {
        this.#panels.forEach(p => p.remove());
        this.#panels = [];
        this.#alignedBeams = [];
        this.#crossBeams = [];
    }
    
    // private
    #recalculateBeams() {
        if (this.#alignment) {
            this.#recalculateAlignedBeamsVertical();
            this.#recalculateCrossBeamsVertical();
        } else {
            this.#recalculateAlignedBeamsHorizontal();
            this.#recalculateCrossBeamsHorizontal();
        }
    }

    // TODO
    #recalculateAlignedBeamsVertical() {

    }

    #recalculateCrossBeamsVertical() {

    }

    #recalculateAlignedBeamsHorizontal() {

    }

    #recalculateCrossBeamsHorizontal() {

    }
}
