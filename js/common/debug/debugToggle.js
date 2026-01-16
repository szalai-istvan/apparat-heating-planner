/** @type {boolean} be vannak-e kapcsolva a debug segédfunkciók */
let debugEnabled = false;

/**
 * Átbillenti a debug funkciók bekapcsoltságát
 * 
 * @returns {boolean}, a debugEnabled flag új értéke
 */
function toggleDisplayDebugInfo() {
    debugEnabled = !debugEnabled;
    return debugEnabled
}
