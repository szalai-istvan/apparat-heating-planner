import { SlabHeaterGroup } from "../../entities/SlabHeaterGroup.js";

/**
 * Visszaadja a slabHeatercsoport szögét
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {number}
 */
function getTotalAngleRad(slabHeaterGroup) {
    return slabHeaterGroup.alignment * HALF_PI + slabHeaterGroup.angleRad;
}

/**
 * Födémfűtő csoportokkal kapcsolatos kalkulációk.
 */
export const SlabHeaterGroupCalculations = {
    getTotalAngleRad
};