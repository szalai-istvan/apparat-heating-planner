/**
 * Elvégzi az elementStore projektre történő testreszabását.
 * 
 * @returns {undefined}
 */
function customizeElementStoreSlabHeatingPlanner() {
    registerElementStoreTypeMapping(CLASS_SLAB_HEATER, 'slabHeaters', 'slabHeatersById');
    registerElementStoreTypeMapping(CLASS_SLAB_HEATER_GROUP, 'slabHeaterGroups', 'slabHeaterGroupsById');
    registerElementStoreTypeMapping(CLASS_PIPE_DRIVER, 'pipeDrivers', 'pipeDriversById');
    registerElementStoreTypeMapping(CLASS_BOX, 'boxes', 'boxesById');
    registerElementStoreTypeMapping(CLASS_BOX_GROUP, 'boxGroups', 'boxGroupsById');
}