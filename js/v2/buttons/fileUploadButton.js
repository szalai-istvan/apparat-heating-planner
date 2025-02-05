const imageInput = document.getElementById('imageInput');

const fileUploadDialogConfirm = document.getElementById('fileUploadDialogConfirm');
const fileUploadDialogConfirmButton = document.getElementById('fileUploadDialogConfirmButton');
const fileUploadDialogCancelButton = document.getElementById('fileUploadDialogCancelButton');


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

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    blueprint.setBlueprintData(loadImage(img.src));
    scaleContext.clear();
  };
  reader.readAsDataURL(file);
}