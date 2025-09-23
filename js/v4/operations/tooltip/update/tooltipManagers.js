/**
 * Megjeleníti a paraméterül kapott kulcsú tooltipet.
 * 
 * @param {string} key, kulcs
 * @returns {undefined}
 */
function displayTooltip(key) {
    tooltipText = TOOLTIPS[key] || '';
}

/**
 * Megjeleníti a paraméterül kapott kulcsú tooltipet, ha a pillanatnyilag megjelenítitt tooltip a feltétel szerinti.
 * 
 * @param {string} presentKey, pillanatnyi kulcs - kritérium
 * @param {string} key, kulcs
 * @returns {undefined}
 */
function displayTooltipIf(presentKey, key) {
    if (tooltipText === TOOLTIPS[presentKey]) {
        displayTooltip(key);
    }
}

/**
 * Megjeleníti a kurzort követő tooltipben a paraméterül kapott kulcsú tooltipet.
 * 
 * @param {string} key, kulcs 
 * @returns {undefined}
 */
function displayCursorTooltip(key) {
    tooltipCursorText = TOOLTIPS[key];

    if (tooltipTimeoutId) {
        clearTimeout(tooltipTimeoutId);
    }

    tooltipTimeoutId = setTimeout(() => tooltipCursorText = '', CURSOR_TOOLTIP_DURATION);
}