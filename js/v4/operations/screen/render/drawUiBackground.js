let apparatLogo;

/**
 * Felrajzolja a kijelzőre a UI hátteret
 * 
 * @returns {undefined}
 */
function drawUiBackground() {
    push();

    fill(UI_COLOR);
    noStroke();
    rect(0, 0, docSize.vw, TOP_RIBBON_HEIGHT);
    rect(0, TOP_RIBBON_HEIGHT, LEFT_RIBBON_WIDTH, docSize.vh - TOP_RIBBON_HEIGHT);
    stroke(3);
    line(LEFT_RIBBON_WIDTH, TOP_RIBBON_HEIGHT, docSize.vw, TOP_RIBBON_HEIGHT);
    line(LEFT_RIBBON_WIDTH, TOP_RIBBON_HEIGHT, LEFT_RIBBON_WIDTH, docSize.vh);

    for (let del of DELIMITER_POSITIONS) {
        line(del.p1.x, del.p1.y, del.p2.x, del.p2.y);
    }

    textAlign(CENTER, CENTER);
    textSize(UI_TEXT_SIZE);
    noStroke();
    fill(DEFAULT_TEXT_COLOR);
    for (let uiText of UI_TEXTS) {
        text(uiText.text, uiText.position.x, uiText.position.y);
    }

    image(apparatLogo, docSize.vw - 293, 5, 287, 49.5);

    pop();
}