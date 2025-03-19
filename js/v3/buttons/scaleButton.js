var scaleButton;

const scalingDialog = document.getElementById('scalingDialog');
const scalingInput = document.getElementById('scalingInput');
const scalingDialogCloseButton = document.getElementById('scalingDialogCloseButton');

const scalingDialogConfirm = document.getElementById('scalingDialogConfirm');
const scalingDialogConfirmButton = document.getElementById('scalingDialogConfirmButton');
const scalingDialogCancelButton = document.getElementById('scalingDialogCancelButton');

function showScalingDialog() {
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