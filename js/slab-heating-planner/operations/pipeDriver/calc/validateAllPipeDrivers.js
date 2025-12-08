/**
 * Validálja a csővezetőket
 * 
 * @returns {undefined}
 */
function validateAllPipeDrivers() {
    elementStore.pipeDrivers.forEach(pd => validatePipeDriver(pd));
}