var downloadSummaryButton;

const transportDialog = document.getElementById('transportDialog');
const transportInput = document.getElementById('transportInput');
const transportDialogOkButton = document.getElementById('transportDialogOkButton');
const transportDialogCloseButton = document.getElementById('transportDialogCloseButton');

function openTransportDialog() {
    transportInput.value = '';
    transportDialog.showModal();
    toggleScreenControls();
}

transportDialogOkButton.addEventListener(CLICK, () => {
    const km = Number(transportInput.value.replace(",", "."));
    if (km < 0) {
        displayMessage('Negatív távolság megadása nem lehetséges.');
        return;
    } else if (isNaN(km)) {
        displayMessage('Érvénytelen távolság!');
        return;
    }

    transportDialog.close();
    toggleScreenControls();
    startExcelExport(km);
});

transportDialogCloseButton.addEventListener(CLICK, () => {
    transportDialog.close();
    toggleScreenControls();
});