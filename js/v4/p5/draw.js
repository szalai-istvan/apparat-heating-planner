function draw() {
    if (saveOrLoadInProgress) {
        return;
    }

    updateCursorType();
    clearSelectionCache();

    background(WHITE);

    push();
    translateScreen();
    renderTranslatedObjects();
    pop();

    renderAbsolutePositionObjects();
}