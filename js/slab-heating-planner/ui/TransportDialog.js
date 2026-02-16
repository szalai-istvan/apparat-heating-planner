import { SelectionAction } from "../../common/actions/selection/SelectionAction.js";
import { Constants } from "../../common/appdata/constants.js";
import { Dialogs } from "../../common/ui/dialog/Dialogs.js";
import { SlabHeatingPlannerExcelGenerator } from "../excel/SlabHeatingPlannerExcelGenerator.js";

const transportDialog = document.getElementById('transportDialog');
const transportDialogRadioSet = document.getElementById('transportDialogRadioSet');
const transportInput = document.getElementById('transportInput');
const transportDialogOkButton = document.getElementById('transportDialogOkButton');
const transportDialogCloseButton = document.getElementById('transportDialogCloseButton');
const igen = document.getElementById('igen');
const nem = document.getElementById('nem');

/**
 * Megnyitja a szállítási dialógus ablakot
 * 
 * @returns {undefined}
 */
function openTransportDialog() {
    SelectionAction.deselectObject();
    // @ts-ignore
    transportDialog.showModal();
    Dialogs.toggleScreenControls();
    // @ts-ignore
    igen.checked = false;
    // @ts-ignore
    nem.checked = true;
    transportInput.setAttribute(Constants.strings.disabled, "true");
    // @ts-ignore
    transportInput.value = '';
}

/**
 * Kezeli a radio gomb változást
 * 
 * @returns {undefined}
 */
function handleRadioButtonChange() {
    // @ts-ignore
    if (igen.checked) {
        transportInput.removeAttribute(Constants.strings.disabled);
    // @ts-ignore
    } else if (nem.checked) {
        transportInput.setAttribute(Constants.strings.disabled, "true");
    }
}

igen.addEventListener(Constants.strings.change, handleRadioButtonChange);
nem.addEventListener(Constants.strings.change, handleRadioButtonChange);

transportDialogOkButton.addEventListener(Constants.strings.click, () => {
    // @ts-ignore
    const km = igen.checked ? Number(transportInput.value) : 0;
    SlabHeatingPlannerExcelGenerator.generateExcel(km);

    // @ts-ignore
    transportDialog.close();
    Dialogs.toggleScreenControls();
});

transportDialogCloseButton.addEventListener(Constants.strings.click, () => {
    // @ts-ignore
    transportDialog.close();
    Dialogs.toggleScreenControls();
});

/**
 * Szálíltás dialógussal kapcsolatos műveletek.
 */
export const TransportDialog = {
    openTransportDialog
};