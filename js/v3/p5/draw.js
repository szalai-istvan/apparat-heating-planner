function draw() {
    selectionContext.clearSelectionCache();

    background(255);

    push();
    screenContext.translate();
    renderer.renderTranslatedObjects();
    pop();

    selectionContext.checkForSelection();
    renderer.renderAbsolutePositionObjects();
}