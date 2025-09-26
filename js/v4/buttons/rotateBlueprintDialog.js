const rotateBlueprintDialog = document.getElementById('rotateBlueprintDialog');
const rotateBlueprintDialogInput = document.getElementById('rotateBlueprintDialogInput');
const rotateBlueprintDialogOkButton = document.getElementById('rotateBlueprintDialogOkButton');
const rotateBlueprintDialogCloseButton = document.getElementById('rotateBlueprintDialogCloseButton');

rotateBlueprintDialogCloseButton.addEventListener(CLICK, () => {
    rotateBlueprintDialog.close();
    toggleScreenControls();
});

rotateBlueprintDialogOkButton.addEventListener(CLICK, () => {
    if (!selectedBlueprint) {
        return;
    }

    selectedBlueprint.angleDeg -= rotateBlueprintDialogInput.value;
    rotateBlueprintDialog.close();
    toggleScreenControls();
    recalculateBlueprintPositions();
});