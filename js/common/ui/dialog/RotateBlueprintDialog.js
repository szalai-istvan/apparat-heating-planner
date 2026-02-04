import { Constants } from "../../appdata/Constants.js";
import { Dialogs } from "./Dialogs.js";
import { UpdateBlueprintAction } from "../../actions/blueprint/UpdateBlueprintAction.js";
import { ApplicationState } from "../../appdata/ApplicationState.js";
import { UnitConversions } from "../../math/UnitConversions.js";

/** @type {HTMLDialogElement} */
const rotateBlueprintDialog = document.getElementById('rotateBlueprintDialog');
const rotateBlueprintDialogInput = document.getElementById('rotateBlueprintDialogInput');
const rotateBlueprintDialogOkButton = document.getElementById('rotateBlueprintDialogOkButton');
const rotateBlueprintDialogCloseButton = document.getElementById('rotateBlueprintDialogCloseButton');

rotateBlueprintDialogCloseButton.addEventListener(Constants.strings.click, () => {
    rotateBlueprintDialog.close();
    Dialogs.toggleScreenControls();
});

rotateBlueprintDialogOkButton.addEventListener(Constants.strings.click, () => {
    UpdateBlueprintAction.incrementBlueprintAngle(ApplicationState.selectedBlueprint, getAngle());
    rotateBlueprintDialog.close();
    Dialogs.toggleScreenControls();
});

/**
 * Megnyitja a tervrajz forgató dialógust.
 * 
 * @returns {undefined}
 */
function openRotateBlueprintDialog() {
    rotateBlueprintDialog.showModal();
    rotateBlueprintDialogInput.value = '';
    Dialogs.toggleScreenControls();
}

/**
 * Visszaadja a modal textboxban lévő szögértéket.
 * 
 * @returns {number}
 */
function getAngle() {
    if (Dialogs.modalIsOpen(rotateBlueprintDialog)) {
        return UnitConversions.toRadians(+(rotateBlueprintDialogInput.value || '0'));
    }

    return 0;
}

/**
 * Tervrajz forgató függvények
 */
export const RotateBlueprintDialog = {
    getAngle,
    openRotateBlueprintDialog
};