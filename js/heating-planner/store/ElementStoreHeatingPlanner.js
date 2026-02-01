import { ElementStore } from "../../common/store/ElementStore.js";
import { HeatingPlannerConstants } from "../appdata/HeatingPlannerConstants.js";

/**
 * Elvégzi az elementStore projektre történő testreszabását.
 * 
 * @returns {undefined}
 */
function customizeElementStoreHeatingPlanner() {
    ElementStore.registerElementStoreTypeMapping(HeatingPlannerConstants.classNames.panel, 'panels', 'panelsById');
    ElementStore.registerElementStoreTypeMapping(HeatingPlannerConstants.classNames.panelGroup, 'panelGroups', 'panelGroupsById');
    ElementStore.registerElementStoreTypeMapping(HeatingPlannerConstants.classNames.structureElements, 'structureElements', 'structureElementsById');
}

/**
 * ElementStore-al kapcsolatos projekt specifikus műveletek.
 */
export const ElementStoreHeatingPlanner = {
    customizeElementStoreHeatingPlanner
};