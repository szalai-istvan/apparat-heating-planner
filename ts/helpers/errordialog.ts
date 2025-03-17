import { screenContext } from "../classes/context/ScreenContext";

export const errorDialog: HTMLDialogElement = document.getElementById('errorDialog') as HTMLDialogElement;
export const errorMessageParagraph: HTMLElement | null = document.getElementById('errorMessageParagraph');
export const errorMessageOkButton: HTMLElement | null = document.getElementById('errorMessageOkButton');

export function displayErrorMessage(text: string) {
    if (errorMessageParagraph) {
        errorMessageParagraph.innerHTML = text;
    }
    errorDialog.showModal();
    screenContext.disableControls();
}

if (errorMessageOkButton) {
    errorMessageOkButton.addEventListener('click', () => {
        errorDialog.close();
        screenContext.enableControls();
    });
}