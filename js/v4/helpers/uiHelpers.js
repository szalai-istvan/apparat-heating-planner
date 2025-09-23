/**
 * Megállapítja, hogy van-e pillanatnyilag nyitott dialógus.
 * 
 * @returns {boolean} true, ha egy dialógus sincs megnyitva
 */
function noModalsAreOpened() {
  return (
    MODALS.filter((modal) => modal.getAttribute("open") !== null).length === 0
  );
}

/**
 * Visszaadja a dokumntum befoglaló méreteit
 * 
 * @returns {{vw: number, vh: number}}, a dokumentum méretei
 */
function getDocumentDimensions() {
    return {
        vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}

/**
 * Korrigálja az adott limithez a paraméterül kapott koordinátát
 * 
 * @param {number} lim limit paraméter
 * @param {number} coord koordináta paraméter
 * @returns korrigált koordinátaérték
 */
function calculateCorrector(lim, coord) {
  return (Math.abs(lim - coord) + lim - coord) / (2 * screenZoom);
}
