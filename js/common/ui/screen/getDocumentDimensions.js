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