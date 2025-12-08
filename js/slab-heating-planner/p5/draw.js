function draw() {
    if (saveOrLoadInProgress) {
        return;
    }

    setCursorType();
    clearSelectionCache();

    background(BACKGROUND_COLOR);

    push();
    translateScreen();
    renderTranslatedObjects();
    pop();

    renderAbsolutePositionObjects();
}