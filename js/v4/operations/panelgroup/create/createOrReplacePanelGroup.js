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
        const originalType = selectedPanelGroup.type;
        setupPanelGroupType(selectedPanelGroup, type);
        updatePanelGroupBoundingBoxIncludingMembers(selectedPanelGroup);

        if (!selectedPanelGroup.isSelectedForDrag && !getContainingRoom(selectedPanelGroup)) {
            displayMessage('A típus változtatás hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt elforgatja!');
            createOrReplacePanelGroup(originalType);
        }

        return;
    }

    const panel = new Panel();
    const group = new PanelGroup({ panel, type });

    selectObject(group);
    group.isSelected = true;
    group.isSelectedForDrag = true;
}