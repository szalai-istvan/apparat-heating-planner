import { ApplicationState } from "../appdata/ApplicationState.js";
import { Languages } from "./Languages.js";

/** @type {{[key: string]: string}} */
let translationFile = null;
/** @type {(translations: {[key: string]: string}) => undefined} */
let projectSpecificI18nFunction = (translations) => { };

/**
 * Betölti az applikáció paramétereknek megfelelő nyelvi fájlt és elvégzi a nemzetközisítő műveleteket
 * 
 * @param {string} newLanguage
 * @returns {undefined} 
 */
function changeLanguage(newLanguage) {
    ApplicationState.language = Languages[newLanguage] || ApplicationState.language;

    fetch(`i18n/languages/${ApplicationState.language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .then(json => { translationFile = json })
        .then(replaceTextsInHtmlSource)
        .then(() => projectSpecificI18nFunction(translationFile))
        .catch(() => { }); // todo error handling
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

/**
 * Beállítja a projektspecifikus nemzetközisítő függvényt.
 * 
 * @param {(translations: {[key: string]: string}) => undefined} func 
 */
function setProjectSpecificI18nFunction(func) {
    projectSpecificI18nFunction = func
}

/**
 * Helyettesíti a HTML fájlban található lefordított elemek szövegét.
 * 
 * @returns {undefined} 
 */
function replaceTextsInHtmlSource() {
    const translatedElements = document.querySelectorAll('[translated]');
    for (let element of translatedElements) {
        const key = element.getAttribute('key');
        element.innerHTML = translate(key);
    }
}

/**
 * Nemzetközisítés műveletek
 */
export const i18n = {
    translate,
    changeLanguage,
    setProjectSpecificI18nFunction
};