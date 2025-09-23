/**
 * Beállítja a kurzor típusát annak függvényében, hogy a kurzor a UI panelen belül van-e.
 * 
 * @returns {undefined}
 */
function updateCursorType() {
    if (mouseCursorIsInsideUi()) {
        cursor(ARROW);
    } else {
        cursor(CROSS);
    }
}