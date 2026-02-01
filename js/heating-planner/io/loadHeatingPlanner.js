import { ElementStore } from "../../common/store/ElementStore.js";
import { HeatingPlannerConstants } from "../appdata/HeatingPlannerConstants.js";

/**
 * Betölti a panel csoportokat, és visszaadja a kiválasztottat.
 * 
 * @param {object} projectState projekt struktúra
 * @returns {panelGroup} a kiválasztott panelcsoport 
 */
function loadPanels(projectState) {
    const panels = projectState?.panels?.panels || [];
    for (let panel of panels) {
        panel.constructor = { name: HeatingPlannerConstants.classNames.panel };
        ElementStore.save(panel);
    }

    const panelGroups = projectState?.panelGroups?.panelGroups || [];
    for (let panelGroup of panelGroups) {
        panelGroup.constructor = { name: HeatingPlannerConstants.classNames.panelGroup };
        ElementStore.save(panelGroup);
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
    structureElements.forEach((se) => (se.constructor = {name: HeatingPlannerConstants.classNames.structureElements}));
    structureElements.forEach((se) => ElementStore.save(se));

    return undefined;
}

/**
 * Projekt specifikus betöltési lépések
 */
export const LoadHeatingPlanner = {
    loadPanels,
    loadStructureElements
};