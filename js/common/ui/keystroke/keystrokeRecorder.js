import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";

/**
 * Rögzíti a megnyomott billentyűt.
 * 
 * @param {KeyboardEvent} s 
 */
function recordKey(s) {
    const key = s.key;

    if (key && key.length === 1) {
        ApplicationState.keyStrokeRecord += key.toUpperCase();
        ApplicationState.keyStrokeRecord = ApplicationState.keyStrokeRecord.substring(keyStrokeRecord.length - Constants.ui.keyStrokeRecordLength);

        ApplicationState.uncensorBoobs = keyStrokeRecord.includes(Constants.ui.uncensorBoobsPassword);

        if (ApplicationState.debugEnabled && ApplicationState.keyStrokeRecord.includes('...')) {
            evictLocalStorageAndReload();
        }
    }
}

addEventListener(Constants.strings.keyup, recordKey);