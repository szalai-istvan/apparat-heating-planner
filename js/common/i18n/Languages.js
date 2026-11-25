import { ApplicationState } from "../appdata/ApplicationState.js";

/**
 * Nyelv opciók
 */
export const Languages = {
    hu: 'hu',
    ro: 'ro',
    next: () => ApplicationState.language === Languages.hu ? Languages.ro : Languages.hu
};