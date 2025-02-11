var displaySummaryTableButton;

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