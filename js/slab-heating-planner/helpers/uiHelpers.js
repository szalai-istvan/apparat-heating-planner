

function bottomPosition(size) {
    return { x: 10, y: window.innerHeight - 10 - size.y };
}

function addTopRibbonDelimeter(x) {
    DELIMITER_POSITIONS.push({
        p1: { x: x, y: 0 },
        p2: { x: x, y: TOP_RIBBON_HEIGHT },
    });
}

function addLeftRibbonDelimeter(y) {
    y -= BUTTON_GAP_Y / 2;
    DELIMITER_POSITIONS.push({
        p1: { x: 0, y: y },
        p2: { x: LEFT_RIBBON_WIDTH, y: y },
    });
}

function addSidePanelText(text, y) {
    UI_TEXTS.push({ text: text, position: { x: LEFT_RIBBON_WIDTH / 2, y: y } });
}

function calculateCorrector(lim, coord) {
    const dif = lim - coord;
    return (Math.abs(dif) + dif) / (2 * screenZoom);
}

function mouseCursorIsInsideUi() {
    return mouseY < TOP_RIBBON_HEIGHT || mouseX < LEFT_RIBBON_WIDTH;
}

function setCursorType() {
    if (mouseCursorIsInsideUi()) {
        cursor(ARROW);
    } else {
        cursor(CROSS);
    }
}