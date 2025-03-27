var fileUploadButton;
var clearBlueprintsButton;

const imageInput = document.getElementById('imageInput');

const fileUploadDialogConfirm = document.getElementById('fileUploadDialogConfirm');
const fileUploadDialogConfirmButton = document.getElementById('fileUploadDialogConfirmButton');
const fileUploadDialogCancelButton = document.getElementById('fileUploadDialogCancelButton');

const pdfUploadDialog = document.getElementById('pdfUploadDialog');
const pdfUploadDialogParagraph = document.getElementById('pdfUploadDialogParagraph');
const pdfUploadDialogInput = document.getElementById('pdfUploadDialogInput');
const pdfUploadDialogCloseButton = document.getElementById('pdfUploadDialogCloseButton');

imageInput.addEventListener('change', handleFileSelect);
let fileName = '';

function upload() {
  imageInput.click();
}

function clearBlueprints() {
  if (scaleContext.ratioIsSet()) {
    fileUploadDialogConfirm.showModal();
    screenContext.disableControls();
  } else {
    blueprintContext.clearBlueprints();
  }

}

fileUploadDialogConfirmButton.addEventListener('click', () => {
  fileUploadDialogConfirm.close();
  screenContext.enableControls();
  blueprintContext.clearBlueprints();
});

fileUploadDialogCancelButton.addEventListener('click', () => {
  fileUploadDialogConfirm.close();
  screenContext.enableControls();
});

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const fileType = file.type;
  
  const split = imageInput.value.replaceAll('\\', '/').split('/');
  fileName = split[split.length - 1];

  imageInput.value = '';
  if (IMAGE_CONTENT_TYPES.includes(fileType)) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      blueprintContext.createBlueprint(loadImage(img.src));
      scaleContext.clear();
    };
    reader.readAsDataURL(file);
  } else if (fileType === PDF_CONTENT_TYPE) {
    const reader = new FileReader();
    reader.onload = async function () {
      readPdfFile(reader, 1);
    };
    reader.readAsArrayBuffer(file);
  } else {
    displayMessage(`Váratlan fájl típus: ${fileType}.<br/>Válasszon jpg, png vagy pdf fájlt a folytatáshoz.`);
  }
}

var pdf;
async function readPdfFile(reader) {
  const pdfData = new Uint8Array(reader.result);
  pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const numberOfPages = pdf._pdfInfo.numPages;
  if (numberOfPages > 1) {
    displayPageSelector(numberOfPages);
  } else {
    parsePdfPage(1);
  }
}

function displayPageSelector(numberOfPages) {
  pdfUploadDialogParagraph.innerHTML = `Adja meg, hogy hanyadik oldalt szeretné beolvasni (maximum: ${numberOfPages}):`;
  pdfUploadDialog.showModal();
  screenContext.disableControls();
}

pdfUploadDialogCloseButton.addEventListener('click', async () => {
  let pageNumber = Number(pdfUploadDialogInput.value);
  if (!(pageNumber > 0) || pageNumber > pdf._pdfInfo.numPages) {
    displayMessage(`Érvénytelen oldalszám: ${pdfUploadDialogInput.value}. Az első oldal lesz megjelenítve.`);
    pageNumber = 1;
  }

  pdfUploadDialogInput.value = '';
  parsePdfPage(pageNumber);
  pdfUploadDialog.close();
  screenContext.enableControls();
});

async function parsePdfPage(pageNumber) {
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
  blueprintContext.createBlueprint(loadImage(imageDataUrl));
  scaleContext.clear();
  pdf = null;
}