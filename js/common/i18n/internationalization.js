import { ApplicationState } from "../appdata/ApplicationState.js";

/** @type {{[key: string]: string}} */
let translationFile = null;

/**
 * Betölti az applikáció paramétereknek megfelelő nyelvi fájlt
 * 
 * @returns {undefined} 
 */
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
        .catch(() => {}); // todo error handling
}

/**
 * Helyettesíti a HTML fájlban található lefordított elemek szövegét.
 * 
 * @returns {undefined} 
 */
function replaceTexts() {
    const translatedElements = document.querySelectorAll('[translated]');
    for (let element of translatedElements) {
        const key = element.getAttribute('key');
        element.innerHTML = translate(key);
    }
}

/**
 * Visszaadja a kulcs lefordított értékét.
 * 
 * @param {string} key 
 * @returns {string}
 */
function translate(key) {
    return translationFile[key] || key;
}