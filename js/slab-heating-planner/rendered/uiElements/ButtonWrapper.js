class ButtonWrapper {
    button = null;
    shouldBeRendered = null;
    lastResult = false;

    constructor({text, size, position, onClick, shouldBeRendered}) {
        this.button = createButton(text);
        this.shouldBeRendered = shouldBeRendered;
        this.lastResult = true;

        this.button.size(size.x, size.y);
        this.button.position(position.x, position.y);
        this.button.mouseClicked(onClick);

        elementStore.register(this);
    }
}