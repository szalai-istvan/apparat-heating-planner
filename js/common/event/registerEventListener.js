/**
 * Regisztrál egy eseménykezelőt
 * 
 * @param {string} type Esemény típus
 * @param {Function} handler Eseménykezelő függvény
 */
function registerEventListener(type, handler) {
    document.addEventListener(type, handler);
}