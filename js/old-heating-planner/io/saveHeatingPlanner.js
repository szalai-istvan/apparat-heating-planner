/**
 * Hozzáadja a projektspecifikus objektumokat a projekt struktúrához.
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {undefined}
 */
function addHeatingPlannerObjectsToProjectState(projectState) {
    projectState.structureElements = {
        structureElements: elementStore.structureElements
    };

    projectState.panelGroups = {
        panelGroups: elementStore.panelGroups
    };

    projectState.panels = {
        panels: elementStore.panels
    };
}