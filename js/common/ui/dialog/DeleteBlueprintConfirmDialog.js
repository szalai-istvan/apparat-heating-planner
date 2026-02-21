import { DeleteBlueprintAction } from "../../actions/blueprint/DeleteBlueprintAction.js";
import { Constants } from "../../appdata/constants.js";
import { Dialogs } from "./Dialogs.js";

/** @type {HTMLDialogElement} */
const deleteBlueprintConfirmDialog = document.getElementById('deleteBlueprintConfirmDialog');
const deleteBlueprintConfirmButton = document.getElementById('deleteBlueprintConfirmButton');
const deleteBlueprintCancelButton = document.getElementById('deleteBlueprintCancelButton');

/**
 * Megnyitja a dialógus ablakot.
 * 
 * @returns {undefined}
 */
function openDialog() {
    deleteBlueprintConfirmDialog.showModal();
    Dialogs.toggleScreenControls();
}

/**
 * Végrehajtja a tervrajz törlését.
 * 
 * @returns {undefined}
 */
function confirmDelete() {
    deleteBlueprintConfirmDialog.close();
    Dialogs.toggleScreenControls();
    DeleteBlueprintAction.removeSelectedBlueprint();
}

/**
 * Mégsem
 * 
 * @returns {undefined}
 */
function cancel() {
    deleteBlueprintConfirmDialog.close();
    Dialogs.toggleScreenControls();
}

deleteBlueprintConfirmButton.addEventListener(Constants.strings.click, confirmDelete);
deleteBlueprintCancelButton.addEventListener(Constants.strings.click, cancel);

/**
 * Tervrajz törlés jóváhagyó dialógus
 */
export const DeleteBlueprintConfirmDialog = {
    openDialog
};