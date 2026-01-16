/**
 * Átváltja a fokban megadott szöget radiánba.
 * 
 * @param {Number} degrees fokban megadott szög. 
 * @returns {Number}, radiánban megadott szög.
 */
function toRadians(degrees) {
    return PI * degrees / 180;
}

/**
 * Átváltja a radiánban megadott szöget fokokba.
 * 
 * @param {Number} radians radiánban megadott szög. 
 * @returns {Number}, fokokban megadott szög.
 */
function toDegrees(radians) {
    return 180 * radians / PI;
}