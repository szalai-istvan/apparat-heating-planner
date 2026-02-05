import { Constants } from "../appdata/Constants.js";
import { MessageDialog } from "../ui/dialog/MessageDialog.js";
import { ClassUtil } from "../util/ClassUtil.js";
import { ErrorTranslations } from "./ErrorCodes.js";

/**
 * Egy hibát reprezentáló entitás.
 */
export class AppError {
    messageCode;

    constructor() { }
}

/**
 * Hiba dobása.
 * 
 * @param {string} messageCode 
 * @returns {undefined}
 */
function throwError(messageCode) {
    const error = new AppError();
    error.messageCode = messageCode;
    throw error;
}

/**
 * 
 * @param {AppError} error 
 * @returns {undefined}
 */
function handleError(error) {
    const className = ClassUtil.getClassName(error);
    if (className === Constants.classNames.appError) {
        const messageCode = error.messageCode;
        const translation = ErrorTranslations[messageCode];
        if (translation) {
            MessageDialog.displayMessage(translation);
        }
    } else {
        console.log(error);
    }
}

window.onerror = function (event, source, lineno, colno, error) {
    handleError(error);
};

/**
 * Hibákkal kapcsolatos műveletek.
 */
export const Errors = {
    throwError,
    handleError
};