let controlsAreEnabled = true;

/**
 * Be- vagy kikapcsolja a képernyő kontrollokat annak függvényében, hogy van-e megnyitva modal ablak
 * 
 * @returns {undefined}
 */
function toggleScreenControls() {
    controlsAreEnabled = noModalsAreOpened();
}

function noModalsAreOpened() {
    return MODALS.filter((modal) => modal.getAttribute("open") !== null).length === 0;
}