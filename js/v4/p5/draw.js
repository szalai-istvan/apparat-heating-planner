function draw() {
    if (saveOrLoadInProgress) {
        return;
    }
    
    background(WHITE);
    updateCursorType();
    clearSelectionCache();


    push();
    translateScreen();
    renderTranslatedObjects();
    pop();

    renderAbsolutePositionObjects();
}