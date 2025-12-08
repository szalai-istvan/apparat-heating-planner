/**
 * Elforgatja a kiválasztott objektumot.
 * 
 * @returns {undefined}
 */
function rotateSelectedObject() {
    if (!selectedObject) {
        return;
    }

    const className = getClassName(selectedObject);

    if (className === CLASS_PANEL_GROUP) {
        rotateSelectedPanelGroup();
    } else if (className === CLASS_BLUEPRINT) {
        rotateBlueprintDialog.showModal();
        rotateBlueprintDialogInput.value = '';
        toggleScreenControls();
    }
}