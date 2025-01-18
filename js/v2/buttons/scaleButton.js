const scalingDialog = document.getElementById('scalingDialog');
const scalingInput = document.getElementById('scalingInput');
const scalingDialogCloseButton = document.getElementById('scalingDialogCloseButton');


var scaleButton;

function showScalingDialog() {
    scalingInput.value = '';
    scalingDialog.showModal();
}

scalingDialogCloseButton.addEventListener('click', (event) => {
    const scalingValue = scalingInput.value.replace(",", ".");
    scaleContext.processScalingValue(scalingValue);
});