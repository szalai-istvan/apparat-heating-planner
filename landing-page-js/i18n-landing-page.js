import { Constants } from "../js/common/appdata/constants.js";
import { i18n } from "../js/common/i18n/i18n.js";
import { Languages } from "../js/common/i18n/Languages.js";

const lang = localStorage.getItem(Constants.i18n.languageKeyLocalStorage) || 'hu';
i18n.changeLanguage(lang);

const changeLanguageButton = document.getElementById('changeLanguageButton');
if (changeLanguageButton) {
    changeLanguageButton.addEventListener('click', () => {
        const nextLanguage = Languages.next();
        i18n.changeLanguage(nextLanguage);
    });
}