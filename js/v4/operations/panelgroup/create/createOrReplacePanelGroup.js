let cachedPanelGroupAlignment = 1;

/**
 * Létrehoz és visszaad egy fűtő csoportot és visszaadja.
 * 
 * @param {string} type, típus 
 * @returns {undefined}
 */
function createOrReplacePanelGroup(type) {
    checkClass(type, CLASS_STRING);
    
    if (selectedPanelGroup) {
        setupPanelGroupType(selectedPanelGroup, type);
        updatePanelGroupBoundingBoxIncludingMembers(selectedPanelGroup);
        return;
    }

    const panel = new Panel();
    const group = new PanelGroup({panel, type});

    selectObject(group);
    group.isSelected = true;
    group.isSelectedForDrag = true;
}