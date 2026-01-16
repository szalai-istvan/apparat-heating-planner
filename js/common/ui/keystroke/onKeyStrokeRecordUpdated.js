const CICI = 'CICI';

/**
 * Függvény, amely lefut a billentyű leütés rekord megváltozásakor.
 * 
 * @returns {undefined}
 */
function onKeyStrokeRecordUpdated() {
    UNCENSOR_BOOBS = KEY_STROKE_RECORD.includes(CICI);

    if (debugEnabled && KEY_STROKE_RECORD.includes('...')) {
        evictLocalStorageAndReload();
    }
}