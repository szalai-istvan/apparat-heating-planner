import { i18n } from "../js/common/i18n/i18n.js";
import { Constants } from "../js/common/appdata/constants.js";

const lang = localStorage.getItem(Constants.i18n.languageKeyLocalStorage) || 'hu';
i18n.changeLanguage(lang);