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
 * Projekt specifikus választó műveletek.
 */
export const HeatingPlannerSelectionAction = {
    searchForSelectablePanelGroup
};