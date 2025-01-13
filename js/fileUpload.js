imageInput.addEventListener('change', handleFileSelect, false);

function upload() {
  imageInput.click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.src = event.target.result;
    blueprintImageData.data = loadImage(img.src);
    blueprintImageData.centerPosition = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
  };
  reader.readAsDataURL(file);
}