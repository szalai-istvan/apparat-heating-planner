/**
 * Létrehoz és visszaad egy véletlenszerű, egyedi azonosítót.
 * 
 * @returns {string} egyedi azonosító
 */
function createUniqueId() {
    return Math.random().toString().substring(2) + Math.random().toString().substring(2);
}