import { DeleteRoomAction } from "../../actions/room/DeleteRoomAction.js";
import { ScalingActions } from "../../actions/scaling/ScalingActions.js";
import { Constants } from "../../appdata/Constants.js";
import { Dialogs } from "./Dialogs.js";

/** @type {HTMLDialogElement} */
const scalingDialog = document.getElementById('scalingDialog');
const scalingInput = document.getElementById('scalingInput');
const scalingDialogCloseButton = document.getElementById('scalingDialogCloseButton');

/** @type {HTMLDialogElement} */
const scalingDialogConfirm = document.getElementById('scalingDialogConfirm');
const scalingDialogConfirmButton = document.getElementById('scalingDialogConfirmButton');
const scalingDialogCancelButton = document.getElementById('scalingDialogCancelButton');

scalingDialogCloseButton.addEventListener(Constants.strings.click, (event) => {
    const scalingValue = scalingInput.value.replace(",", ".");
    if (Number(scalingValue) > 0) {
        ScalingActions.processScalingValue(scalingValue);
        scalingDialog.close();
        Dialogs.toggleScreenControls();
    }
});

scalingDialogConfirmButton.addEventListener(Constants.strings.click, () => {
    scalingDialogConfirm.close();
    Dialogs.toggleScreenControls();
    DeleteRoomAction.clearRooms();
    ScalingActions.startScaling();
});

scalingDialogCancelButton.addEventListener(Constants.strings.click, () => {
    scalingDialogConfirm.close();
    Dialogs.toggleScreenControls();
});

function showScalingDialog() {
    scalingInput.value = '';
    scalingDialog.showModal();
    Dialogs.toggleScreenControls();
    setTimeout(() => scalingInput.focus(), 200);
}

function showScalingConfirmDialog() {
    scalingDialogConfirm.showModal();
    Dialogs.toggleScreenControls();
}

/**
 * Méretarányozó dialog műveletek.
 */
export const ScalingDialog = {
    showScalingConfirmDialog,
    showScalingDialog
};