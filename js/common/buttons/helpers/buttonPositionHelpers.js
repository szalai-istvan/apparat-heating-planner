/**
 * Visszaadja a következő felső gomb pozíciót.
 * 
 * @param {Point[]} topRibbonButtonSizes 
 * @returns {Point}
 */
function topRibbonButtonPosition(topRibbonButtonSizes) {
    const sumButtonWidth = topRibbonButtonSizes
        .map((trbs) => trbs.x)
        .reduce(sumFunction, 0);
    const sumGap = (topRibbonButtonSizes.length + 1) * BUTTON_GAP_X;
    return createPoint(LEFT_RIBBON_WIDTH + sumButtonWidth + sumGap, BUTTON_GAP_X);
}

/**
 * Visszaadja a következő oldalsó gomb pozíciót.
 * 
 * @param {Point[]} sideRibbonButtonSizes 
 * @returns {Point}
 */
function sidePanelButtonPosition(sideRibbonButtonSizes) {
    const sumButtonHeight = sideRibbonButtonSizes
        .map((trbs) => trbs.y)
        .reduce(sumFunction, 0);
    const sumGap = (sideRibbonButtonSizes.length + 1) * BUTTON_GAP_Y;
    return createPoint(BUTTON_GAP_X, 55 + sumButtonHeight + sumGap);
}

/**
 * Megállapítja és visszaadja egy megadott méretű UI elem pozícióját
 * 
 * @param {Point} size UI elem mérete
 * @returns {Point}, UI elem pozíciója
 */
function bottomPosition(size) {
    return createPoint(BUTTON_GAP_X, window.innerHeight - BUTTON_GAP_Y - size.y);
}