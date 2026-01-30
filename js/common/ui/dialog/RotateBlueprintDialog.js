import { Constants } from "../../appdata/Constants.js";
import { Dialogs } from "./Dialogs.js";
import { UpdateBlueprintAction } from "../../actions/blueprint/UpdateBlueprintAction.js";

const rotateBlueprintDialog = document.getElementById('rotateBlueprintDialog');
const rotateBlueprintDialogInput = document.getElementById('rotateBlueprintDialogInput');
const rotateBlueprintDialogOkButton = document.getElementById('rotateBlueprintDialogOkButton');
const rotateBlueprintDialogCloseButton = document.getElementById('rotateBlueprintDialogCloseButton');

rotateBlueprintDialogCloseButton.addEventListener(Constants.strings.click, () => {
    rotateBlueprintDialog.close();
    Dialogs.toggleScreenControls();
});

rotateBlueprintDialogOkButton.addEventListener(Constants.strings.click, () => {
    UpdateBlueprintAction.updateBlueprintAngle(ApplicationState.selectedBlueprint, getAngle());
    rotateBlueprintDialog.close();
    Dialogs.toggleScreenControls();
});

function getAngle() {
    if (Dialogs.modalIsOpen(rotateBlueprintDialog)) {
        return +(rotateBlueprintDialogInput.value || '0');
    }

    return 0;
}

/**
 * Tervrajz forgató függvények
 */
export const RotateBlueprintDialog = {
    getAngle
};