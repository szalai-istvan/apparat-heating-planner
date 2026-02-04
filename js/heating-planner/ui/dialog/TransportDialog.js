import { Constants } from "../../../common/appdata/Constants.js";
import { ErrorCodes } from "../../../common/errors/ErrorCodes.js";
import { Errors } from "../../../common/errors/Errors.js";
import { Dialogs } from "../../../common/ui/dialog/Dialogs.js";
import { HeatingPlannerExcelExport } from "../../excel/HeatingPlannerExcelExport.js";

var downloadSummaryButton;

/** @type {HTMLDialogElement} */
const transportDialog = document.getElementById('transportDialog');
const transportInput = document.getElementById('transportInput');
const transportDialogOkButton = document.getElementById('transportDialogOkButton');
const transportDialogCloseButton = document.getElementById('transportDialogCloseButton');

function openTransportDialog() {
    transportInput.value = '';
    transportDialog.showModal();
    Dialogs.toggleScreenControls();
}

transportDialogOkButton.addEventListener(Constants.strings.click, () => {
    const km = Number(transportInput.value.replace(",", "."));
    if (km < 0 || isNaN(km)) {
        Errors.throwError(ErrorCodes.INVALID_DISTANCE);
    }

    transportDialog.close();
    Dialogs.toggleScreenControls();
    HeatingPlannerExcelExport.startExcelExport(km);
});

transportDialogCloseButton.addEventListener(Constants.strings.click, () => {
    transportDialog.close();
    Dialogs.toggleScreenControls();
});

export const TransportDialog = {
    openTransportDialog
};