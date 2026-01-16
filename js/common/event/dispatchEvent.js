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