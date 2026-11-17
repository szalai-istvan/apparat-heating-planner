import { ApplicationState } from "../appdata/ApplicationState.js";

let translationFile = null;

function loadTranslationFile() {
    fetch(`i18n/languages/${ApplicationState.language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .then(json => {translationFile = json})
        .then(replaceTexts)
        .catch(() => {});
}

function replaceTexts() {
    const translatedElements = document.querySelectorAll('[translated]');
    for (let element of translatedElements) {
        const key = element.getAttribute('key');
        element.innerHTML = translationFile[key];
    }
}

loadTranslationFile();