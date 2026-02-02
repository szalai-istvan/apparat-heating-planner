import { Constants } from "../../appdata/Constants.js";
import { Dialogs } from "./Dialogs.js";

/** @type {HTMLDialogElement} */
const messageDialog = document.getElementById("messageDialog");
const messageParagraph = document.getElementById("messageParagraph");
const messageOkButton = document.getElementById("messageOkButton");

function displayMessage(text) {
    messageParagraph.innerHTML = text;
    messageDialog.showModal();
    Dialogs.toggleScreenControls();
}

messageOkButton.addEventListener(Constants.strings.click, () => {
    messageDialog.close();
    Dialogs.toggleScreenControls();
});

/**
 * Párbeszédablak műveletek
 */
export const MessageDialog = {
    displayMessage
};