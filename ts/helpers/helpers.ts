import { Constants } from "../appdata/constants";
import { addRoomButton, addRoomDialog } from "../buttons/addRoomsButton";
import { summaryTableDialog, transportDialog, transportDialogOkButton } from "../buttons/downloadSummaryButton";
import { fileUploadDialogConfirm, fileUploadDialogConfirmButton, pdfUploadDialog, pdfUploadDialogCloseButton } from "../buttons/fileUploadButton";
import { scalingDialogConfirmButton, scalingDialogCloseButton, scalingDialogConfirm, scalingDialog } from "../buttons/scaleButton";
import { resizeCanvas } from "../declarations/declarations";
import { canvas } from "../p5/setup";
import { Coordinates, DocumentDimensions, Reducer } from "../types/types";
import { displayErrorMessage, errorDialog, errorMessageOkButton } from "./errordialog";

export function calculateDistance(p1: Coordinates, p2: Coordinates): number {
    const deltaX = p2.x - p1.x;
    const deltaY = p2.y - p1.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

export function disableContextMenu(): void {
  const body: HTMLBodyElement = document.getElementsByTagName("body")[0] as HTMLBodyElement;
  body.addEventListener("contextmenu", (e: any) => e.preventDefault());
}

export function disableEscapeButton(): void {
  for (let element of document.getElementsByTagName('dialog')) {
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        event.preventDefault();
    }
    });
  }
}

export function handleWindowResize(): void {
  window.addEventListener('resize', () => {
    if (canvas) {
      const docSize = getDocumentDimensions();
      const width = docSize.vw;
      const height = window.innerHeight;
      canvas.canvas.style = `width: ${width}px; height: ${height}px;`;
      canvas.width = width;
      canvas.height = height;
      // FIXME ? resizeCanvas(windowWidth, windowHeight);
      resizeCanvas(width, height);
    }
  });
}

const ENTERABLE_BUTTONS: Array<HTMLElement | null>  = [
  errorMessageOkButton, 
  fileUploadDialogConfirmButton, 
  scalingDialogConfirmButton, 
  scalingDialogCloseButton, 
  addRoomButton, 
  pdfUploadDialogCloseButton, 
  transportDialogOkButton
];

export function enableEnterForConfirm(): void {
  window.addEventListener('keypress', event => {
    if (event.key !== 'Enter') {
      return;
    };

    ENTERABLE_BUTTONS
      .filter(e => e !== null)
      .filter(e => e.checkVisibility())[0]
      .click();
  });
}

const MODALS: Array<HTMLElement | null> = [
  errorDialog, 
  fileUploadDialogConfirm, 
  scalingDialogConfirm, 
  scalingDialog, 
  addRoomDialog, 
  pdfUploadDialog, 
  summaryTableDialog, 
  transportDialog
];

export function noModalsAreOpened(): boolean {
  return MODALS
    .filter(modal => modal !== null)
    .filter(modal => modal.getAttribute('open') !== null).length === 0;
}

export const minimumFunction: Reducer<number> = (a: number, b: number): number => a < b ? a : b;
export const maximumFunction: Reducer<number> = (a: number, b: number): number => a > b ? a : b;
export const summaryFunction: Reducer<number> = (a: number, b: number ): number => a + b;

export function topRibbonButtonPosition(col: number): Coordinates {
    return {x: -20 + col * (20 + Constants.REGULAR_BUTTON_SIZE.x), y: 10};
}

export function sidePanelButtonPosition(row: number): Coordinates {
    return {x: 10, y: 70 + row * (Constants.SMALL_BUTTON_SIZE.y + 5)};
}

export function bottomPosition(size: Coordinates): Coordinates {
  return {x: 10, y: window.innerHeight - 10 - size.y};
}

export function tooltipPosition(): Coordinates {
  const button4Position = topRibbonButtonPosition(4);
  return {x: button4Position.x, y: button4Position.y + Constants.REGULAR_BUTTON_SIZE.y / 2};
}

export function pointIsInside(point: Coordinates, middlePoint: Coordinates, areaWidth: number, areaHeight: number): boolean {
  const x = point.x;
  const y = point.y;
  let minX, maxX, minY, maxY;

  minX = middlePoint.x - areaWidth / 2;
  maxX = middlePoint.x + areaWidth / 2;
  
  minY = middlePoint.y - areaHeight / 2;
  maxY = middlePoint.y + areaHeight / 2;

  return x > minX && x < maxX && y > minY && y < maxY;
}

export function getClassName(obj: object): string {
  if (!obj || typeof(obj) !== 'object') {
      return '';
  }

  return obj.constructor.name;
}

const nfObject = new Intl.NumberFormat('en-US');
export function formatNumber(num: number): string {
  if (isNullOrUndefined(num)) {
    return '';
  };
  if (typeof(num) !== 'number') return '';
  return nfObject.format(num).replace(',', ' ');
}

export function roundNumber(number: number, decimals: number): number {
  const x = 10**decimals;
  return Math.round(number * x) / x;
}

export function displayDeveloperData() {
  displayErrorMessage('Készítette: Szalai István<br/>e-mail: szalai.istvan95@gmail.com<br/>Tel.: +36 30 846 2686');
}

export function isNullOrUndefined(param: any): boolean {
  return param == null;
}

export function isDefined(param: any): boolean {
  return !isNullOrUndefined(param);
}

export function getDocumentDimensions(): DocumentDimensions {
  return {
      vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  };
}