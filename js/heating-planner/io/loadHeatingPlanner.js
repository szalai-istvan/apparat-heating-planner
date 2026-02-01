import { HeatingPlannerConstants } from "../appdata/ConstantsHeatingPlanner.js";

/**
 * Betölti a panel csoportokat, és visszaadja a kiválasztottat.
 * 
 * @param {object} projectState projekt struktúra
 * @returns {panelGroup} a kiválasztott panelcsoport 
 */
function loadPanels(projectState) {
    const panels = projectState.panels.panels || [];
    for (let panel of panels) {
        panel.constructor = { name: HeatingPlannerConstants.classNames.panel };
        elementStore.register(panel);
    }

    const panelGroups = projectState.panelGroups.panelGroups || [];
    for (let panelGroup of panelGroups) {
        panelGroup.constructor = { name: HeatingPlannerConstants.classNames.panelGroup };
        elementStore.register(panelGroup);
    }

    return panelGroups.filter(pg => pg.isSelected)[0];
}

/**
 * Betölti a szerkezeti elemeket.
 * 
 * @param {object} projectState
 * @returns {undefined}
 */
function loadStructureElements(projectState) {
    const structureElements = projectState.structureElements.structureElements || [];
    structureElements.forEach((se) => (se.constructor = {name: CLASS_STRUCTURE_ELEMENTS}));
    structureElements.forEach((se) => elementStore.register(se));

    return undefined;
}

/**
 * Projekt specifikus betöltési lépések
 */
export const LoadHeatingPlanner = {
    loadPanels,
    loadStructureElements
};