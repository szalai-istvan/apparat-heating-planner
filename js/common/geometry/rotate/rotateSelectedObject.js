/**
 * Elforgatja a kiválasztott objektumot.
 * 
 * @param {Number} direction Forgatás iránya
 * @returns {undefined}
 */
function rotateSelectedObject(direction) {
    if (!selectedObject) {
        return;
    }

    const className = getClassName(selectedObject);
    
    if (className === CLASS_BLUEPRINT) {
        rotateBlueprintDialog.showModal();
        rotateBlueprintDialogInput.value = '';
        toggleScreenControls();
    } else {
        dispatchCustomEvent(ROTATE_SELECTED_OBJECT, {direction: direction});
    }
}