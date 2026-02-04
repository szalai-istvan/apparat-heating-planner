import { ElementStore } from "../../common/store/ElementStore.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";

/**
 * Elvégzi az elementStore projektre történő testreszabását.
 * 
 * @returns {undefined}
 */
function customizeElementStoreSlabHeatingPlanner() {
    ElementStore.registerElementStoreTypeMapping(SlabHeatingPlannerConstants.classNames.slabHeater, 'slabHeaters', 'slabHeatersById');
    ElementStore.registerElementStoreTypeMapping(SlabHeatingPlannerConstants.classNames.slabHeaterGroup, 'slabHeaterGroups', 'slabHeaterGroupsById');
    ElementStore.registerElementStoreTypeMapping(SlabHeatingPlannerConstants.classNames.pipeDriver, 'pipeDrivers', 'pipeDriversById');
    ElementStore.registerElementStoreTypeMapping(SlabHeatingPlannerConstants.classNames.box, 'boxes', 'boxesById');
    ElementStore.registerElementStoreTypeMapping(SlabHeatingPlannerConstants.classNames.boxGroup, 'boxGroups', 'boxGroupsById');
}

/**
 * Elementstore konfiguráció műveletek.
 */
export const ElementStoreSlabHeatingPlanner = {
    customizeElementStoreSlabHeatingPlanner
};