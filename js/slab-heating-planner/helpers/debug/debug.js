let debugEnabled = false;

function toggleDisplayDebugInfo() {
    debugEnabled = !debugEnabled;
}

function evictLocalStorageAndReload() {
    localStorage.removeItem(LOCAL_STORAGE_DATA_KEY);
    location.reload();
}