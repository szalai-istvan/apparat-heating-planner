/**
 * Törli a böngésző local storage-jában tárolt projekt állapotot, és újratölti az oldalt.
 * 
 * @returns {undefined}
 */
function evictLocalStorageAndReload() {
    localStorage.removeItem(LOCAL_STORAGE_DATA_KEY);
    location.reload();
}