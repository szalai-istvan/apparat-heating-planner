import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { ErrorCodes } from "../../errors/ErrorCodes.js";
import { Errors } from "../../errors/Errors.js";
import { Dialogs } from "../../ui/dialog/Dialogs.js";
import { ScalingActions } from "../scaling/ScalingActions.js";
import { CreateBlueprintAction } from "./CreateBlueprintAction.js";
import { DeleteBlueprintAction } from "./DeleteBlueprintAction.js";

var fileUploadButton;
var clearBlueprintsButton;

const imageInput = document.getElementById('imageInput');

/** @type {HTMLDialogElement} */
const fileUploadDialogConfirm = document.getElementById('fileUploadDialogConfirm');
const fileUploadDialogConfirmButton = document.getElementById('fileUploadDialogConfirmButton');
const fileUploadDialogCancelButton = document.getElementById('fileUploadDialogCancelButton');

/** @type {HTMLDialogElement} */
const pdfUploadDialog = document.getElementById('pdfUploadDialog');
const pdfUploadDialogParagraph = document.getElementById('pdfUploadDialogParagraph');
const pdfUploadDialogInput = document.getElementById('pdfUploadDialogInput');
const pdfUploadDialogCloseButton = document.getElementById('pdfUploadDialogCloseButton');

let fileName = '';

imageInput.addEventListener(Constants.strings.change, handleFileSelect);
fileUploadDialogConfirmButton.addEventListener(Constants.strings.click, () => {
    fileUploadDialogConfirm.close();
    Dialogs.toggleScreenControls();
    DeleteBlueprintAction.clearBlueprints();
});

fileUploadDialogCancelButton.addEventListener(Constants.strings.click, () => {
    fileUploadDialogConfirm.close();
    Dialogs.toggleScreenControls();
});

pdfUploadDialogCloseButton.addEventListener(Constants.strings.click, async () => {
    let pageNumber = Number(pdfUploadDialogInput.value);
    if (!(pageNumber > 0) || pageNumber > pdf._pdfInfo.numPages) {
        pageNumber = 1;
        Errors.throwError(ErrorCodes.INVALID_PAGE_NUMBER);
    }

    pdfUploadDialogInput.value = '';
    parsePdfPage(pageNumber);
    pdfUploadDialog.close();
    Dialogs.toggleScreenControls();
});

/**
 * Új tervrajz feltöltése.
 * 
 * @returns {undefined}
 */
function uploadBlueprint() {
    imageInput.click();
}

function promptToClearBlueprints() {
    const pixelsPerMetersRatio = ApplicationState.pixelsPerMetersRatio;

    if (pixelsPerMetersRatio) {
        fileUploadDialogConfirm.showModal();
        Dialogs.toggleScreenControls();
    } else {
        DeleteBlueprintAction.clearBlueprints();
    }

}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const fileType = file.type;

    const split = imageInput.value.replaceAll('\\', '/').split('/');
    fileName = split[split.length - 1];

    imageInput.value = '';
    if (Constants.file.supportedImageContentTypes.includes(fileType)) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            CreateBlueprintAction.createBlueprint(loadImage(img.src));
            ScalingActions.clearScaling();
        };
        reader.readAsDataURL(file);
    } else if (fileType === Constants.file.supportedPdfContentType) {
        const reader = new FileReader();
        reader.onload = async function () {
            readPdfFile(reader, 1);
        };
        reader.readAsArrayBuffer(file);
    } else {
        Errors.throwError(ErrorCodes.UNEXPECTED_FILE_TYPE);
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
    Dialogs.toggleScreenControls();
}

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
    CreateBlueprintAction.createBlueprint(loadImage(imageDataUrl));
    ScalingActions.clearScaling();
    pdf = null;
}

/**
 * Új tervrajz feltöltése akció exportálása.
 */
export const UploadNewBlueprint = {
    uploadBlueprint
};