import { Constants } from "../appdata/constants.js"
import { ElementStore } from "../store/ElementStore.js"
import { i18n } from "./i18n.js";

/**
 * Lefordítja a P5 alapú UI elemek szövegét
 * 
 * @returns {undefined} 
 */
function translateP5UiElements() {
    const buttons = ElementStore.findAll(Constants.classNames.buttonWrapper);
    for (let button of buttons) {
        if (button.translationKey) {
            const translation = i18n.translateKey(button.translationKey);
            button.button.html(translation);
        }
    }

    const menuLines = ElementStore.findAll(Constants.classNames.menuLine);
    for (let menuLine of menuLines) {
        if (menuLine.translationKey) {
            const translation = i18n.translateKey(menuLine.translationKey);
            menuLine.baseButton.html(translation);
        }

        let i = 0;
        for (let key of menuLine.buttonTranslationKeys) {
            const translation = i18n.translateKey(key);
            menuLine.menuItems[i].html(translation);
            i++;
        }
    }
}

/**
 * Exportált függvények
 */
export const TranslateP5UiElements = {
    translateP5UiElements
}