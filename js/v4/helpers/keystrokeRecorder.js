let KEY_STROKE_RECORD = '';
let keyStrokeResetTimerId = undefined;

function recordKey(s) {
    const key = s.key;
    if (key && key.length === 1) {
        KEY_STROKE_RECORD += key.toUpperCase();
        KEY_STROKE_RECORD = KEY_STROKE_RECORD.substring(KEY_STROKE_RECORD.length - 30);
        UNCENSOR_BOOBS = KEY_STROKE_RECORD.includes('CICI');

        if (keyStrokeResetTimerId) {
            clearTimeout(keyStrokeResetTimerId);
            keyStrokeResetTimerId = setTimeout(() => {KEY_STROKE_RECORD = ''; UNCENSOR_BOOBS = false;}, 60_000);
        }

        if (debugEnabled && KEY_STROKE_RECORD.includes('...')) {
            evictLocalStorageAndReload();
        }
    }
}

addEventListener('keyup', recordKey);