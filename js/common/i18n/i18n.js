import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/constants.js";
import { Languages } from "./Languages.js";
import { TranslateP5UiElements } from "./translateP5UiElements.js";

/** @type {{[key: string]: string}} */
let translationFile = {};
/** @type {() => undefined} */
let projectSpecificI18nFunction = () => { };

/**
 * Betölti az applikáció paramétereknek megfelelő nyelvi fájlt és elvégzi a nemzetközisítő műveleteket
 * 
 * @param {string} newLanguage
 * @returns {undefined} 
 */
function changeLanguage(newLanguage) {
    ApplicationState.language = Languages[newLanguage] || ApplicationState.language;
    localStorage.setItem(Constants.i18n.languageKeyLocalStorage, ApplicationState.language);

    fetch(`i18n/languages/${ApplicationState.language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .then(json => { translationFile = json })
        .then(translateHtmlSource)
        .then(TranslateP5UiElements.translateP5UiElements)
        .then(projectSpecificI18nFunction)
        .catch(() => { }); // todo error handling
}

/**
 * Visszaadja a kulcs lefordított értékét.
 * 
 * @param {string} key 
 * @returns {string}
 */
function translateKey(key) {
    return translationFile[key] || key;
}

/**
 * Beállítja a projektspecifikus nemzetközisítő függvényt.
 * 
 * @param {() => undefined} func 
 */
function setProjectSpecificI18nFunction(func) {
    projectSpecificI18nFunction = func
}

/**
 * Helyettesíti a HTML fájlban található lefordított elemek szövegét.
 * 
 * @returns {undefined} 
 */
function translateHtmlSource() {
    const translatedElements = document.querySelectorAll('[translated]');
    for (let element of translatedElements) {
        const key = element.getAttribute('key');
        element.innerHTML = translateKey(key);
    }
}

/**
 * Nemzetközisítés műveletek
 */
export const i18n = {
    translateKey,
    changeLanguage,
    setProjectSpecificI18nFunction
};