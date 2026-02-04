import { BoxGroup } from "../entities/BoxGroup.js";
import { PipeDriver } from "../entities/PipeDriver.js";
import { SlabHeaterGroup } from "../entities/SlabHeaterGroup.js";

/**
 * Projekt specifikus alkalmazás állapot.
 */
export const SlabHeatingPlannerApplicationState = {
    /** @type {SlabHeaterGroup} */
    selecteSlabHeaterGroup: null,
    /** @type {PipeDriver} */
    selectedPipeDriver: null,
    /** @type {BoxGroup} */
    selectedBoxGroup: null
};