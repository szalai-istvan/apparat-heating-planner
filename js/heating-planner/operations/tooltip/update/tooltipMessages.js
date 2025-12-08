/**
 * @type {string}, pillanatnyilag megjelenített tooltip szöveg
 */
let tooltipText = '';
/**
 * @type {string}, pillanatnyilag megjelenített kurzor tooltip szöveg
 */
let tooltipCursorText = '';
/**
 * @type {number}, a kurzor tooltip visszaszámláló azonosítója
 */
let tooltipTimeoutId = null;

function applicationStarted() {
    displayTooltip(WELCOME);
    setTimeout(() => displayTooltipIf(WELCOME, DRAWING_UPLOAD), 4_000);
}