let KEY_STROKE_RECORD = '';

function recordKey(s) {
    const key = s.key;
    if (key && key.length === 1) {
        KEY_STROKE_RECORD += key.toUpperCase();
        KEY_STROKE_RECORD = KEY_STROKE_RECORD.substring(KEY_STROKE_RECORD.length - 30);
    }
}

addEventListener(KEYUP, recordKey);