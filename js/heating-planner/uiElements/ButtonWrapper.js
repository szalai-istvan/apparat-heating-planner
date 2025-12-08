class ButtonWrapper {
    button = null;
    shouldBeActive = null;
    lastResult = false;

    constructor({text, size, position, onClick, shouldBeActive}) {
        this.button = createButton(text);
        this.shouldBeActive = shouldBeActive;
        this.lastResult = true;

        this.button.size(size.x, size.y);
        this.button.position(position.x, position.y);
        this.button.mouseClicked(onClick);

        elementStore.register(this);
    }
}