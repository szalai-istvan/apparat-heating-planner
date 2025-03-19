class ButtonWrapper {
    #button = null;
    #shouldBeRendered = null;

    constructor({text, size, position, onClick, shouldBeRendered}) {
        this.#button = createButton(text);
        this.#button.size(size.x, size.y);
        this.#button.position(position.x, position.y);
        this.#button.mouseClicked(onClick);
        this.#shouldBeRendered = shouldBeRendered;
        renderer.register(this);
    }

    draw() {
        const button = this.#button;
        if (this.#shouldBeRendered()) {
            button.show();
        } else {
            button.hide();
        }
    }
}



function addButton({text, size, position, onClick, shouldBeRendered}) {
    const button = createButton(text);
    button.size(size.x, size.y);
    button.position(position.x, position.y);
    button.mouseClicked(onClick);

}