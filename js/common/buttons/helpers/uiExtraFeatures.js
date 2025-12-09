/**
 * Létrehoz egy elválasztó vonalat a felső menüszalagon.
 * 
 * @param {number} x
 * @returns {undefined}
 */
function addTopRibbonDelimeter(x) {
    DELIMITER_POSITIONS.push({
        p1: createPoint(x, 0),
        p2: createPoint(x, TOP_RIBBON_HEIGHT)
    });
}

/**
 * Létrehoz egy elválasztó vonalat a baloldali menüszalagon.
 * 
 * @param {number} y
 * @returns {undefined}
 */
function addLeftRibbonDelimeter(y) {
    y -= BUTTON_GAP_Y / 2;
    DELIMITER_POSITIONS.push({
        p1: createPoint(0, y),
        p2: createPoint(LEFT_RIBBON_WIDTH, y)
    });
}

/**
 * Hozzáad a baloldali menüszalaghoz egy feliratot.
 * 
 * @param {string} text 
 * @param {number} y 
 * @returns {undefined}
 */
function addSidePanelText(text, y) {
    UI_TEXTS.push({ text: text, position: { x: LEFT_RIBBON_WIDTH / 2, y: y } });
}