/**
 * Törli a kijelölt objektumot.
 * 
 * @returns {undefined}
 */
function removeSelectedObject() {
    const selected = selectedObject;
    if (!selected) {
        return;
    }
    const className = getClassName(selected);
    
    if (className === CLASS_ROOM) {
        removeSelectedRoom();
    } else if (className === CLASS_PANEL_GROUP) {
        removeSelectedPanelGroup();
    } else if (className === CLASS_BLUEPRINT) {
        removeSelectedBlueprint();
    }
}