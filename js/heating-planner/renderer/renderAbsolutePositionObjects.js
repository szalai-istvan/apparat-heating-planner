/**
 * Felrajzolja a kijelzőre az abszolút pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderAbsolutePositionObjects() {
    drawUiBackground();
    drawTooltips();
    elementStore.buttons.forEach(button => drawButtonWrapper(button));

    if (debugEnabled) {
        drawCursorDebugInfo();
    }
}