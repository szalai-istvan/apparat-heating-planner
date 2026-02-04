import { BoxGroupService } from "../service/BoxGroupService.js";
import { BoxService } from "../service/BoxService.js";
import { PipeDriverService } from "../service/PipeDriverService.js";
import { SlabHeaterGroupService } from "../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../service/SlabHeaterService.js";

/**
 * Hozzáadja a projektspecifikus objektumokat a projekt struktúrához.
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {undefined}
 */
function addSlabHeatingPlannerObjectsToProjectState(projectState) {
    projectState.slabHeaterGroups = {
        slabHeaterGroups: SlabHeaterGroupService.findAll()
    };

    projectState.slabHeaters = {
        slabHeaters: SlabHeaterService.findAll()
    };

    projectState.boxGroups = {
        boxGroups: BoxGroupService.findAll()
    };

    projectState.boxes = {
        boxes: BoxService.findAll()
    };

    projectState.pipeDrivers = {
        pipeDrivers: PipeDriverService.findAll()
    };
}

/**
 * Projekt specifikus mentési műveletek
 */
export const SaveSlabHeatingPlanner = {
    addSlabHeatingPlannerObjectsToProjectState
};