import { screenContext } from "../classes/context/ScreenContext";
import { scaleContext } from "../classes/renderable/ScaleContext";

export const scalingDialog: HTMLDialogElement = document.getElementById('scalingDialog') as HTMLDialogElement;
export const scalingInput: HTMLInputElement = document.getElementById('scalingInput') as HTMLInputElement;
export const scalingDialogCloseButton: HTMLButtonElement = document.getElementById('scalingDialogCloseButton') as HTMLButtonElement;

export const scalingDialogConfirm: HTMLDialogElement = document.getElementById('scalingDialogConfirm') as HTMLDialogElement;
export const scalingDialogConfirmButton: HTMLButtonElement = document.getElementById('scalingDialogConfirmButton') as HTMLButtonElement;
export const scalingDialogCancelButton: HTMLButtonElement = document.getElementById('scalingDialogCancelButton') as HTMLButtonElement;

export function showScalingDialog() {
    scalingInput.value = '';
    scalingDialog.showModal();
    screenContext.disableControls();
    setTimeout(() => scalingInput.focus(), 200);
}

scalingDialogCloseButton.addEventListener('click', (event) => {
    const scalingValue = scalingInput.value.replace(",", ".");
    scaleContext.processScalingValue(scalingValue);
});

scalingDialogConfirmButton.addEventListener('click', () => {
    scalingDialogConfirm.close();
    screenContext.enableControls();
    scaleContext.clear();
    scaleContext.startScaling();
});

scalingDialogCancelButton.addEventListener('click', () => {
    scalingDialogConfirm.close();
    screenContext.enableControls();
});