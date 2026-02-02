import { Constants } from "../../appdata/Constants.js";
import { Validators } from "../../validators/Validators.js";
import { ButtonWrapper } from "./ButtonWrapper.js";

/**
 * Felrajzolja a képernyője a paraméterül kapott gombot
 * 
 * @param {ButtonWrapper} buttonWrapper gomb.
 * @returns {undefined}
 */
function renderButtonWrapper(buttonWrapper) {
    Validators.checkClass(buttonWrapper, Constants.classNames.buttonWrapper);

    const button = buttonWrapper.button;
    if (buttonWrapper.shouldBeActive() && !buttonWrapper.lastResult) {
        button.removeAttribute(Constants.strings.disabled);
        buttonWrapper.lastResult = true;
    }

    if (!buttonWrapper.shouldBeActive() && buttonWrapper.lastResult) {
        button.attribute(Constants.strings.disabled, Constants.strings.emptyString);
        buttonWrapper.lastResult = false;
    }
}

/**
 * ButtonWrapper objektum műveletek.
 */
export const ButtonWrapperActions = {
    renderButtonWrapper
};