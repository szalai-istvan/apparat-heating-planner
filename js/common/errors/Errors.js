import { Constants } from "../appdata/Constants.js";
import { MessageDialog } from "../ui/dialog/MessageDialog.js";
import { ClassUtil } from "../util/ClassUtil.js";
import { ErrorTranslations } from "./ErrorCodes.js";

/**
 * Egy hibát reprezentáló entitás.
 */
export class AppError {
    messageCode;
    stackTrace;

    constructor() { }
}

/**
 * Hiba dobása.
 * 
 * @param {string} messageCode 
 * @returns {undefined}
 */
function throwError(messageCode) {
    const stackTrace = new Error().stack;
    const error = new AppError();
    error.messageCode = messageCode;
    error.stackTrace = stackTrace;
    throw error;
}

/**
 * Egységesített hibakezelő függvény
 * 
 * @param {AppError} error 
 * @returns {undefined}
 */
function handleError(error) {
    console.error(error);
    const className = ClassUtil.getClassName(error);
    if (className === Constants.classNames.appError) {
        const messageCode = error.messageCode;
        const stackTrace = error.stackTrace;
        const translation = ErrorTranslations[messageCode];
        if (translation) {
            MessageDialog.displayMessage(translation);
            console.error(stackTrace);
        } else {
            MessageDialog.displayMessage(messageCode);
            console.error(stackTrace);
        }
    }
}

window.onerror = function (event, source, lineno, colno, error) {
    // @ts-ignore
    handleError(error);
};

/**
 * Hibákkal kapcsolatos műveletek.
 */
export const Errors = {
    throwError,
    handleError
};