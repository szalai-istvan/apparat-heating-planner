let scalingInProgress = false;

/**
 * Elindítja a méretarány felvétel folyamatot
 * 
 * @returns {undefined}
 */
function startScaling() {
    if (operationInProgress()) {
        return;
    }

    if (!configuredRoomsExist()) {
        scalingInProgress = true;
        clearScaling();
    } else {
        scalingDialogConfirm.showModal();
        toggleScreenControls();
    }
}