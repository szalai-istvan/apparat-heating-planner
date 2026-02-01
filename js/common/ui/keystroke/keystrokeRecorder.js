import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";

/**
 * Rögzíti a megnyomott billentyűt.
 * 
 * @param {KeyboardEvent} s 
 */
function recordKey(s) {
    const key = s.key;

    const existingKeyStrokeRecord = ApplicationState.keyStrokeRecord || '';
    if (key && key.length === 1) {
        ApplicationState.keyStrokeRecord += key.toUpperCase();
        ApplicationState.keyStrokeRecord = existingKeyStrokeRecord.substring(existingKeyStrokeRecord.length - Constants.ui.keyStrokeRecordLength);

        ApplicationState.uncensorBoobs = ApplicationState.keyStrokeRecord.includes(Constants.ui.uncensorBoobsPassword);

        if (ApplicationState.debugEnabled && ApplicationState.keyStrokeRecord.includes('...')) {
            evictLocalStorageAndReload();
        }
    }
}

addEventListener(Constants.strings.keyup, recordKey);