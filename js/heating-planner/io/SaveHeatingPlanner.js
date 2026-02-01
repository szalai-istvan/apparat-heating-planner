import { PanelGroupService } from "../service/PanelGroupService.js";
import { PanelService } from "../service/PanelService.js";
import { StructureElementsService } from "../service/StructureElementsService.js";

/**
 * Hozzáadja a projektspecifikus objektumokat a projekt struktúrához.
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {undefined}
 */
function addHeatingPlannerObjectsToProjectState(projectState) {
    projectState.structureElements = {
        structureElements: StructureElementsService.findAll()
    };

    projectState.panelGroups = {
        panelGroups: PanelGroupService.findAll()
    };

    projectState.panels = {
        panels: PanelService.findAll()
    };
}

/**
 * Projekt specifikus mentési műveletek
 */
export const SaveHeatingPlanner = {
    addHeatingPlannerObjectsToProjectState
};