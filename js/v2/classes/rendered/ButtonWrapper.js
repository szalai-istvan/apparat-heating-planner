class ButtonWrapper {
    button = null;
    shouldBeRendered = null;

    constructor({text, size, position, onClick, shouldBeRendered}) {
        this.button = createButton(text);
        this.shouldBeRendered = shouldBeRendered;

        this.button.size(size.x, size.y);
        this.button.position(position.x, position.y);
        this.button.mouseClicked(onClick);

        renderer.register(this);
    }
}