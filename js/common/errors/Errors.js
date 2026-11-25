import { Constants } from "../appdata/constants.js";
import { i18n } from "../i18n/i18n.js";
import { MessageDialog } from "../ui/dialog/MessageDialog.js";
import { ClassUtil } from "../util/ClassUtil.js";

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
        const translation = i18n.translateKey('error.' + messageCode);
        if (translation) {
            MessageDialog.displayMessage(translation);
        } else {
            MessageDialog.displayMessage(messageCode);
        }
        console.error(stackTrace);
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