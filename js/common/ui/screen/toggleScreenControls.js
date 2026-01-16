let controlsAreEnabled = true;

/**
 * Be- vagy kikapcsolja a képernyő kontrollokat annak függvényében, hogy van-e megnyitva modal ablak
 * 
 * @returns {undefined}
 */
function toggleScreenControls() {
    controlsAreEnabled = noModalsAreOpened();
}

/**
 * Megállapítja, hogy van-e pillanatnyilag nyitott dialógus.
 * 
 * @returns {boolean} true, ha egy dialógus sincs megnyitva
 */
function noModalsAreOpened() {
    return MODALS.filter((modal) => modalIsOpen(modal)).length === 0;
}

/**
 * Megállapítja, hogy a paraméterül kapott dialógus nyitva van-e.
 * 
 * @returns {boolean} true, ha nyitva van.
 */
function modalIsOpen(dialog) {
    return dialog.getAttribute(OPEN) !== null;
}