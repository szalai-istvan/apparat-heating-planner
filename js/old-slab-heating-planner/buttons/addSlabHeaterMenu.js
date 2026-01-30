var slabHeaterLengthOptionsBar;
var slabHeaterWidthOptionsBar;

var addSlabHeaterButton;

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
        return roundNumber(Number(s0) + 0.01 * Number(s1), 1);
    }
    return undefined;
}