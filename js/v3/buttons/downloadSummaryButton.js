var downloadSummaryButton;

const transportDialog = document.getElementById('transportDialog');
const transportInput = document.getElementById('transportInput');
const transportDialogOkButton = document.getElementById('transportDialogOkButton');
const transportDialogCloseButton = document.getElementById('transportDialogCloseButton');

function openTransportDialog() {
    transportInput.value = '';
    transportDialog.showModal();
    screenContext.disableControls();
}

transportDialogOkButton.addEventListener('click', () => {
    const km = Number(transportInput.value.replace(",", "."));
    if (km < 0) {
        displayMessage('Negatív távolság megadása nem lehetséges.');
        return;
    } else if (isNaN(km)) {
        displayMessage('Érvénytelen távolság!');
        return;
    }

    transportDialog.close();
    screenContext.enableControls();
    startExcelExport(km);
});

transportDialogCloseButton.addEventListener('click', () => {
    transportDialog.close();
    screenContext.enableControls();
});

// kept only just in case
const summaryTableDialog = document.getElementById('summaryTableDialog');
const summaryTableDialogTablePlaceHolder = document.getElementById('summaryTableDialogTablePlaceHolder');
const summaryTableDialogCloseButton = document.getElementById('summaryTableDialogCloseButton');

function openSummaryTableDialog() {
    summaryTableDialogTablePlaceHolder.innerHTML = '';
    const summaryTable = summaryCalculator.calculateSummaryAndMapToHtml();
    if (!summaryTable) return;
    summaryTableDialogTablePlaceHolder.appendChild(summaryTable);
    summaryTableDialog.showModal();
    screenContext.disableControls();
}

summaryTableDialogCloseButton.addEventListener('click', () => {
    summaryTableDialog.close();
    screenContext.enableControls();
});