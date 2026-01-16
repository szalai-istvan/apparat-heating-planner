/**
 * Hozzáadja a projektspecifikus objektumokat a projekt struktúrához.
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {undefined}
 */
function addSlabHeatingPlannerObjectsToProjectState(projectState) {
    projectState.slabHeaterGroups = {
        slabHeaterGroups: elementStore.slabHeaterGroups
    };

    projectState.slabHeaters = {
        slabHeaters: elementStore.slabHeaters
    };

    projectState.boxGroups = {
        boxGroups: elementStore.boxGroups
    };

    projectState.boxes = {
        boxes: elementStore.boxes
    };

    projectState.pipeDrivers = {
        pipeDrivers: elementStore.pipeDrivers
    };
}

registerProjectSpecificSavingStep(addHeatingPlannerObjectsToProjectState); // todo ez setup lépés