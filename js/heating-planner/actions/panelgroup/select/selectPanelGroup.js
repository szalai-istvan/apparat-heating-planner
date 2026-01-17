/** @type {PanelGroup} Kiválasztott szoba */
let selectedPanelGroup = null;
/** @type {PanelGroup} Cachelt kiválasztható szoba */
let cachedSelectablePanelGroup = null;


/**
 * Megkeresi és visszaadja a kiválasztható panelcsoportot.
 * 
 * @returns {PanelGroup}
 */
function searchForSelectablePanelGroup() {
    const selectedPanelGroup = selectPanelGroup();
    if (selectedPanelGroup) {
        selectedObject = selectedPanelGroup;
        return selectedPanelGroup;
    }
}

/**
 * Megkeresi és kiválasztja a fűtőelem csoportot és visszaadja
 * 
 * @param {PanelGroup} panelGroup specifikálható kiválasztandó fűtőelem csoport (opcionális).
 * @returns {PanelGroup} a kiválasztott fűtőelem csoport.
 */
function selectPanelGroup(panelGroup = undefined) {
    checkClass(panelGroup, CLASS_PANEL_GROUP, true);

    panelGroup = panelGroup || checkForSelectablePanelGroup();
    if (!panelGroup) {
        return;
    }

    if (panelGroup === selectedPanelGroup) {
        panelGroup.isSelected = true;
        panelGroup.isSelectedForDrag = true;
        setSelectedPanelGroupIndex(panelGroup);
        return panelGroup;
    }

    if (deselectObject()) {
        panelGroup.isSelected = true;
        selectedPanelGroup = panelGroup;
        return panelGroup;
    }
    return undefined;
}

/**
 * Megkeresi a kiválasztható fűtőelem csoportot és visszaadja
 * 
 * @returns {PanelGroup} a kiválasztható fűtőelem csoport.
 */
function checkForSelectablePanelGroup() {
    if (cachedSelectablePanelGroup) {
        return cachedSelectablePanelGroup;
    }

    const selection = elementStore.panelGroups.filter(pg => mouseCursorIsInsidePanelGroupMembersTextbox(pg));
    const panelGroup = selection[0];
    if (panelGroup) {
        cachedSelectablePanelGroup = panelGroup;
        return panelGroup;
    }

    return undefined;
}