import { screenContext } from "../classes/context/ScreenContext";
import { displayErrorMessage } from "../helpers/errordialog";

export const transportDialog: HTMLDialogElement = document.getElementById('transportDialog') as HTMLDialogElement;
const transportInput: HTMLInputElement = document.getElementById('transportInput') as HTMLInputElement;
export const transportDialogOkButton: HTMLButtonElement = document.getElementById('transportDialogOkButton') as HTMLButtonElement;
const transportDialogCloseButton: HTMLButtonElement = document.getElementById('transportDialogCloseButton') as HTMLButtonElement;

export function openTransportDialog(): void {
    transportInput.value = '';
    transportDialog.showModal();
    screenContext.disableControls();
}

transportDialogOkButton.addEventListener('click', () => {
    const km = Number(transportInput.value.replace(",", "."));
    if (km < 0) {
        displayErrorMessage('Negatív távolság megadása nem lehetséges.');
        return;
    } else if (isNaN(km)) {
        displayErrorMessage('Érvénytelen távolság!');
        return;
    }

    transportDialog.close();
    screenContext.enableControls();
    // TODO startExcelExport(km);
});

transportDialogCloseButton.addEventListener('click', () => {
    transportDialog.close();
    screenContext.enableControls();
});

// kept only for just-in-case
export const summaryTableDialog: HTMLDialogElement = document.getElementById('summaryTableDialog') as HTMLDialogElement;
export const summaryTableDialogTablePlaceHolder: HTMLDivElement = document.getElementById('summaryTableDialogTablePlaceHolder') as HTMLDivElement;
export const summaryTableDialogCloseButton: HTMLButtonElement = document.getElementById('summaryTableDialogCloseButton') as HTMLButtonElement;

function openSummaryTableDialog(): void {
    summaryTableDialogTablePlaceHolder.innerHTML = '';
    // TODO
    // const summaryTable = summaryCalculator.calculateSummaryAndMapToHtml();
    // if (!summaryTable) return;
    // summaryTableDialogTablePlaceHolder.appendChild(summaryTable);
    // summaryTableDialog.showModal();
    // screenContext.disableControls();
}

summaryTableDialogCloseButton.addEventListener('click', () => {
    summaryTableDialog.close();
    screenContext.enableControls();
});