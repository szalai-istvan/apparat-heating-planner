const imageInput = document.getElementById('imageInput');

const fileUploadDialogConfirm = document.getElementById('fileUploadDialogConfirm');
const fileUploadDialogConfirmButton = document.getElementById('fileUploadDialogConfirmButton');
const fileUploadDialogCancelButton = document.getElementById('fileUploadDialogCancelButton');

const pdfUploadDialog = document.getElementById('pdfUploadDialog');
const pdfUploadDialogParagraph = document.getElementById('pdfUploadDialogParagraph');
const pdfUploadDialogInput = document.getElementById('pdfUploadDialogInput');
const pdfUploadDialogCloseButton = document.getElementById('pdfUploadDialogCloseButton');


var fileUploadButton;

imageInput.addEventListener('change', handleFileSelect);

function upload() {
  if (scaleContext.ratioIsSet()) {
    fileUploadDialogConfirm.showModal();
  } else {
    imageInput.click();
  }
}

fileUploadDialogConfirmButton.addEventListener('click', () => {
  fileUploadDialogConfirm.close();
  imageInput.click();
});

fileUploadDialogCancelButton.addEventListener('click', () => fileUploadDialogConfirm.close());

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const fileType = file.type;

  if (['image/jpeg', 'image/png'].includes(fileType)) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      blueprint.setBlueprintData(loadImage(img.src));
      scaleContext.clear();
    };
    reader.readAsDataURL(file);
  } else if (fileType === 'application/pdf') {
    const reader = new FileReader();
    reader.onload = async function () {
      readPdfFile(reader, 1);
    };
    reader.readAsArrayBuffer(file);
  } else {
    displayErrorMessage(`Váratlan fájl típus: ${fileType}.\nVálasszon jpg, png vagy pdf fájlt a folytatáshoz.`);
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
  blueprint.setBlueprintData(loadImage(imageDataUrl));
  scaleContext.clear();
  pdf = null;
}