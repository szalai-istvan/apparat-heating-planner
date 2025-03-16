import { Constants } from "../appdata/constants";
export function calculateDistance(p1, p2) {
    const deltaX = p2.x - p1.x;
    const deltaY = p2.y - p1.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
export function disableContextMenu() {
    for (let element of document.getElementsByTagName("body")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
}
export function disableEscapeButton() {
    for (let element of document.getElementsByTagName('dialog')) {
        element.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                event.stopImmediatePropagation();
                event.preventDefault();
            }
        });
    }
}
export function handleWindowResize() {
    window.addEventListener('resize', () => {
        if (canvas) {
            docSize = getDocumentDimensions();
            const width = docSize.vw;
            const height = window.innerHeight;
            canvas.canvas.style = `width: ${width}px; height: ${height}px;`;
            canvas.width = width;
            canvas.height = height;
        }
    });
}
const ENTERABLE_BUTTONS = [
    errorMessageOkButton,
    fileUploadDialogConfirmButton,
    scalingDialogConfirmButton,
    scalingDialogCloseButton,
    addRoomButton,
    pdfUploadDialogCloseButton,
    transportDialogOkButton
];
export function enableEnterForConfirm() {
    window.addEventListener('keypress', event => {
        if (event.key !== 'Enter') {
            return;
        }
        ;
        ENTERABLE_BUTTONS
            .filter(e => e !== null)
            .filter(e => e.checkVisibility())[0]
            .click();
    });
}
const MODALS = [
    errorDialog,
    fileUploadDialogConfirm,
    scalingDialogConfirm,
    scalingDialog,
    addRoomDialog,
    pdfUploadDialog,
    summaryTableDialog,
    transportDialog
];
export function noModalsAreOpened() {
    return MODALS
        .filter(modal => modal !== null)
        .filter(modal => modal.getAttribute('open') !== null).length === 0;
}
export const minimumFunction = (a, b) => a < b ? a : b;
export const maximumFunction = (a, b) => a > b ? a : b;
export function topRibbonButtonPosition(col) {
    return { x: -20 + col * (20 + Constants.REGULAR_BUTTON_SIZE.x), y: 10 };
}
export function sidePanelButtonPosition(row) {
    return { x: 10, y: 70 + row * (Constants.SMALL_BUTTON_SIZE.y + 5) };
}
export function bottomPosition(size) {
    return { x: 10, y: window.innerHeight - 10 - size.y };
}
export function tooltipPosition() {
    const button4Position = topRibbonButtonPosition(4);
    return { x: button4Position.x, y: button4Position.y + Constants.REGULAR_BUTTON_SIZE.y / 2 };
}
export function pointIsInside(point, middlePoint, areaWidth, areaHeight) {
    const x = point.x;
    const y = point.y;
    let minX, maxX, minY, maxY;
    minX = middlePoint.x - areaWidth / 2;
    maxX = middlePoint.x + areaWidth / 2;
    minY = middlePoint.y - areaHeight / 2;
    maxY = middlePoint.y + areaHeight / 2;
    return x > minX && x < maxX && y > minY && y < maxY;
}
export function getClassName(obj) {
    if (!obj || typeof (obj) !== 'object') {
        return '';
    }
    return obj.constructor.name;
}
const nfObject = new Intl.NumberFormat('en-US');
export function formatNumber(num) {
    if (isNullOrUndefined(num)) {
        return '';
    }
    ;
    if (typeof (num) !== 'number')
        return '';
    return nfObject.format(num).replace(',', ' ');
}
export function roundNumber(number, decimals) {
    const x = Math.pow(10, decimals);
    return Math.round(number * x) / x;
}
export function displayDeveloperData() {
    displayErrorMessage('Készítette: Szalai István<br/>e-mail: szalai.istvan95@gmail.com<br/>Tel.: +36 30 846 2686');
}
export function isNullOrUndefined(param) {
    return param == null;
}
export function isDefined(param) {
    return !isNullOrUndefined(param);
}
