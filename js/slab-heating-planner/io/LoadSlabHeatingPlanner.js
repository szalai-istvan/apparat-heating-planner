import { ElementStore } from "../../common/store/ElementStore.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";
import { BoxGroup } from "../entities/BoxGroup.js";
import { PipeDriver } from "../entities/PipeDriver.js";
import { SlabHeaterGroup } from "../entities/SlabHeaterGroup.js";

/**
 * Betölti a födémfűtő csoportokat, és visszaadja a kiválasztottat.
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {SlabHeaterGroup} A kiválasztott födémfűtő csoport
 */
function loadSlabHeaters(projectState) {
    const slabHeaters = projectState?.slabHeaters?.slabHeaters || [];
    for (let slabHeater of slabHeaters) {
        slabHeater.constructor = { name: SlabHeatingPlannerConstants.classNames.slabHeater };
        ElementStore.save(slabHeater);
    }

    const slabHeaterGroups = projectState?.slabHeaterGroups?.slabHeaterGroups || [];
    for (let slabHeaterGroup of slabHeaterGroups) {
        slabHeaterGroup.constructor = { name: SlabHeatingPlannerConstants.classNames.slabHeaterGroup };
        ElementStore.save(slabHeaterGroup);
    }

    return slabHeaterGroups.filter(shg => shg.isSelected)[0];
}

/**
 * Betölti a födémáttöréseket, és visszaadja a kiválasztottat
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {BoxGroup} A kiválasztott dobozcsoport
 */
function loadBoxes(projectState) {
    const boxes = projectState?.boxes?.boxes || [];
    for (let box of boxes) {
        box.constructor = { name: SlabHeatingPlannerConstants.classNames.box };
        ElementStore.save(box);
    }

    const boxGroups = projectState?.boxGroups?.boxGroups || [];
    for (let boxGroup of boxGroups) {
        boxGroup.constructor = { name: SlabHeatingPlannerConstants.classNames.boxGroup };
        ElementStore.save(boxGroup);
    }

    return boxGroups.filter(bg => bg.isSelected)[0];
}

/**
 * Betölti a csőnyomvonalakat, és visszaadja a kiválasztottat.
 * 
 * @param {object} projectState Projekt struktúra
 * @returns {PipeDriver} A kiválasztott csőnyomvonal
 */
function loadPipeDrivers(projectState) {
    const pipeDrivers = projectState?.pipeDrivers?.pipeDrivers || [];

    for (let pipeDriver of pipeDrivers) {
        pipeDriver.constructor = { name: SlabHeatingPlannerConstants.classNames.pipeDriver };
        ElementStore.save(pipeDriver);
        // recalculatePipeDriverConfiguration(pipeDriver);
    }

    return pipeDrivers.filter(pd => pd.isSelected)[0];
}

// function recalculatePipeDriverConfiguration(pipeDriver) {
    // const boxGroup = getBoxGroupWithEndNodeAtPipeDriversLastPoint(pipeDriver);
    // if (boxGroup) {
        // boxGroup.pipeDriverId = pipeDriver.id;
        // pipeDriver.isFullyConfigured = true;
    // }
// } todo ez vajon kell?

/**
 * Projekt specifikus betöltési lépések
 */
export const LoadSlabHeatingPlanner = {
    loadBoxes,
    loadSlabHeaters,
    loadPipeDrivers
};