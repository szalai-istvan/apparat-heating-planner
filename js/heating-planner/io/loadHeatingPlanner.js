/**
 * Betölti a panel csoportokat, és visszaadja a kiválasztottat.
 * 
 * @param {object} projectState projekt struktúra
 * @returns {PanelGroup} a kiválasztott panelcsoport 
 */
function loadPanels(projectState) {
    const panels = projectState.panels.panels || [];
    for (let panel of panels) {
        panel.constructor = { name: CLASS_PANEL };
        elementStore.register(panel);
    }

    const panelGroups = projectState.panelGroups.panelGroups || [];
    for (let panelGroup of panelGroups) {
        panelGroup.constructor = { name: CLASS_PANEL_GROUP };
        elementStore.register(panelGroup);
    }

    return panelGroups.filter(pg => pg.isSelected)[0];
}