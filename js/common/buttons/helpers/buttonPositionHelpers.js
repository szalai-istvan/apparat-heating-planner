/**
 * Visszaadja a következő felső gomb pozíciót.
 * 
 * @param {Point[]} topRibbonButtonSizes 
 * @returns 
 */
function topRibbonButtonPosition(topRibbonButtonSizes) {
    const sumButtonWidth = topRibbonButtonSizes
        .map((trbs) => trbs.x)
        .reduce(sumFunction, 0);
    const sumGap = (topRibbonButtonSizes.length + 1) * BUTTON_GAP_X;
    return {
        x: LEFT_RIBBON_WIDTH + sumButtonWidth + sumGap,
        y: 10,
    };
}

/**
 * Visszaadja a következő oldalsó gomb pozíciót.
 * 
 * @param {Point[]} sideRibbonButtonSizes 
 * @returns {undefined}
 */
function sidePanelButtonPosition(sideRibbonButtonSizes) {
    const sumButtonHeight = sideRibbonButtonSizes
        .map((trbs) => trbs.y)
        .reduce(sumFunction, 0);
    const sumGap = (sideRibbonButtonSizes.length + 1) * BUTTON_GAP_Y;
    return {
        x: 10,
        y: 55 + sumButtonHeight + sumGap,
    };
}