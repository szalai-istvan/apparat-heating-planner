/**
 * Elvégzi az elementStore projektre történő testreszabását.
 * 
 * @returns {undefined}
 */
function customizeElementStoreHeatingPlanner() {
    registerElementStoreTypeMapping(CLASS_PANEL, 'panels', 'panelsById');
    registerElementStoreTypeMapping(CLASS_PANEL_GROUP, 'panelGroups', 'panelGroupsById');
    registerElementStoreTypeMapping(CLASS_STRUCTURE_ELEMENTS, 'structureElements', 'structureElementsById');
}
