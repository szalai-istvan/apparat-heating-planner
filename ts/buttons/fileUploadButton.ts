import { Constants } from "../appdata/constants";
import { screenContext } from "../classes/context/ScreenContext";
import { blueprint } from "../classes/renderable/Blueprint";
import { scaleContext } from "../classes/renderable/ScaleContext";
import { loadImage, pdfjsLib } from "../declarations/declarations";
import { displayErrorMessage } from "../helpers/errordialog";

const imageInput: HTMLInputElement = document.getElementById('imageInput') as HTMLInputElement;

export const fileUploadDialogConfirm: HTMLDialogElement = document.getElementById('fileUploadDialogConfirm') as HTMLDialogElement;
export const fileUploadDialogConfirmButton: HTMLButtonElement = document.getElementById('fileUploadDialogConfirmButton') as HTMLButtonElement;
export const fileUploadDialogCancelButton: HTMLButtonElement = document.getElementById('fileUploadDialogCancelButton') as HTMLButtonElement;

export const pdfUploadDialog: HTMLDialogElement = document.getElementById('pdfUploadDialog') as HTMLDialogElement;
export const pdfUploadDialogParagraph: HTMLParagraphElement = document.getElementById('pdfUploadDialogParagraph') as HTMLParagraphElement;
export const pdfUploadDialogInput: HTMLInputElement = document.getElementById('pdfUploadDialogInput') as HTMLInputElement;
export const pdfUploadDialogCloseButton: HTMLButtonElement = document.getElementById('pdfUploadDialogCloseButton') as HTMLButtonElement;

imageInput.addEventListener('change', handleFileSelect);

export function upload(): void {
  if (scaleContext.ratioIsSet()) {
    fileUploadDialogConfirm.showModal();
    screenContext.disableControls();
  } else {
    imageInput.click();
  }
}

fileUploadDialogConfirmButton.addEventListener('click', () => {
  fileUploadDialogConfirm.close();
  screenContext.enableControls();
  imageInput.click();
});

fileUploadDialogCancelButton.addEventListener('click', () => {
  fileUploadDialogConfirm.close();
  screenContext.enableControls();
});

function handleFileSelect(event: any) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const fileType = file.type;

  if (Constants.IMAGE_CONTENT_TYPES.includes(fileType)) {
    const reader = new FileReader();
    reader.onload = function (event: any) {
      const img: any = new Image();
      img.src = event.target.result;
      blueprint.setBlueprintData(loadImage(img.src));
      scaleContext.clear();
    };
    reader.readAsDataURL(file);
  } else if (fileType === Constants.PDF_CONTENT_TYPE) {
    const reader = new FileReader();
    reader.onload = async function () {
      readPdfFile(reader);
    };
    reader.readAsArrayBuffer(file);
  } else {
    displayErrorMessage(`Váratlan fájl típus: ${fileType}.<br/>Válasszon jpg, png vagy pdf fájlt a folytatáshoz.`);
  }
}

let pdf: any;
async function readPdfFile(reader: any) {
  const pdfData = new Uint8Array(reader.result);
  pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const numberOfPages = pdf._pdfInfo.numPages;
  if (numberOfPages > 1) {
    displayPageSelector(numberOfPages);
  } else {
    parsePdfPage(1);
  }
}

function displayPageSelector(numberOfPages: number): void {
  pdfUploadDialogParagraph.innerHTML = `Adja meg, hogy hanyadik oldalt szeretné beolvasni (maximum: ${numberOfPages}):`;
  pdfUploadDialog.showModal();
  screenContext.disableControls();
}

pdfUploadDialogCloseButton.addEventListener('click', async () => {
  let pageNumber = Number(pdfUploadDialogInput.value);
  if (!(pageNumber > 0) || pageNumber > pdf._pdfInfo.numPages) {
    displayErrorMessage(`Érvénytelen oldalszám: ${pdfUploadDialogInput.value}. Az első oldal lesz megjelenítve.`);
    pageNumber = 1;
  }

  pdfUploadDialogInput.value = '';
  parsePdfPage(pageNumber);
  pdfUploadDialog.close();
  screenContext.enableControls();
});

async function parsePdfPage(pageNumber: number) {
  const page = await pdf.getPage(pageNumber);
  const scale = 2;
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const renderContext = { canvasContext: context, viewport };
  await page.render(renderContext).promise;
  const imageDataUrl = canvas.toDataURL("image/png");
  blueprint.setBlueprintData(loadImage(imageDataUrl));
  scaleContext.clear();
  pdf = null;
}