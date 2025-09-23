/**
 * Törli a rajzlapon található összes tervrajzot és törli a rögzített méretarányokat.
 * 
 * @returns {undefined}
 */
function clearBlueprints() {
	if (pixelsPerMetersRatio) {
		fileUploadDialogConfirm.showModal();
		toggleScreenControls();
	} else {
		elementStore.blueprints = [];
		clearScaling();
	}
}