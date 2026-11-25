import { LoadLocalizedPrices } from "../appdata/loadLocalizedPrices.js";

/**
 * Elvégzi az alkalmazásspecifikus nemzetközisítő műveleteket.
 * 
 * @returns {undefined}
 */
function internationalizeHeatingPlanner() {
    LoadLocalizedPrices.retrieveLocalPrices();
}

export const HeatingPlannerI18n = {
    internationalizeHeatingPlanner
};