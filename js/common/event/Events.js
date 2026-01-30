/**
 * Regisztrál egy eseménykezelőt
 * 
 * @param {string} type Esemény típus
 * @param {Function} handler Eseménykezelő függvény, amely az esemény detail részét kapja paraméterül.
 */
function registerEventListener(type, handler) {
    document.addEventListener(type, (event) => handler(event.detail));
}

/**
 * Létrehoz és dispatchel egy eseményt.
 * 
 * @param {string} type típus
 * @param {any} event esemény részlétek
 * @returns {undefined}
 */
function dispatchCustomEvent(type, event) {
    document.dispatchEvent(new CustomEvent(type, {detail: event}));
}

/**
 * Eseménykezelő műveletek
 */
export const Events = {
    registerEventListener,
    dispatchCustomEvent
};