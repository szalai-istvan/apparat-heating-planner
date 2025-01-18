const imageInput = document.getElementById('imageInput');

var fileUploadButton;

imageInput.addEventListener('change', handleFileSelect);

function upload() {
  imageInput.click();
}

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
  };
  reader.readAsDataURL(file);
}