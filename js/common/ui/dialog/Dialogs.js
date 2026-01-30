import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";

/**
 * Be- vagy kikapcsolja a képernyő kontrollokat annak függvényében, hogy van-e megnyitva modal ablak
 * 
 * @returns {undefined}
 */
function toggleScreenControls() {
    ApplicationState.controlsAreEnabled = noModalsAreOpened();
}

/**
 * Megállapítja, hogy van-e pillanatnyilag nyitott dialógus.
 * 
 * @returns {boolean} true, ha egy dialógus sincs megnyitva
 */
function noModalsAreOpened() {
    return Constants.ui.modals.filter((modal) => modalIsOpen(modal)).length === 0;
}

/**
 * Megállapítja, hogy a paraméterül kapott dialógus nyitva van-e.
 * 
 * @returns {boolean} true, ha nyitva van.
 */
function modalIsOpen(dialog) {
    return dialog.getAttribute(Constants.strings.open) !== null;
}

/**
 * Dialógusokra vonatkozó közös függvények.
 */
export const Dialogs = {
    toggleScreenControls,
    noModalsAreOpened,
    modalIsOpen
};