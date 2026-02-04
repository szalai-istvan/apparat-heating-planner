import { MathTools } from "../../common/math/MathTools.js";
import { OptionsBar } from "../../common/ui/OptionsBar/OptionsBar.js";

/**
 * Kiszámolja és visszaadja a födémfűtő panel hossz opció panel értékét
 * 
 * @param {OptionsBar} optionsBar 
 * @returns {Number} Kalkulált érték
 */
function resolveSlabHeaterLengthOptionBarValue(optionsBar) {
    const s0 = optionsBar.selected[0];
    const s1 = optionsBar.selected[1];
    if (s0 && s1) {
        return MathTools.roundNumber(Number(s0) + 0.01 * Number(s1), 1);
    }
    return undefined;
}

/**
 * Födémfűtő menü érték feloldó függvény
 */
export const SlabHeaterMenuValueResolver = {
    resolveSlabHeaterLengthOptionBarValue
};