/** {boolean} flag, hogy a renderelés be van-e kapcsolva. */
let renderingEnabled = false;

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

/**
 * Kikapcsolja a renderelést.
 * 
 * @returns {undefined}
 */
function disableRendering() {
    renderingEnabled = false;
}

/**
 * Bekapcsolja a renderelést.
 * 
 * @returns {undefined}
 */
function enableRendering() {
    renderingEnabled = true;
}

setTimeout(() => {
    if (!renderingEnabled) {
        console.log("Don't forget to enable rendering in the setup!");
    }
}, 2_000);