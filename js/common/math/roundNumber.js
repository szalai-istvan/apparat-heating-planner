/**
 * A megadott számú tizedesjegyre kerekíti a paraméterül kapott számot.
 * 
 * @param {number} number a kerekítenivaló szám 
 * @param {number} decimals kívánt tizedesjegyek száma
 * @returns {number} Kerekített szám
 */
function roundNumber(number, decimals) {
    const x = 10 ** decimals;
    return Math.round(number * x) / x;
}