var jsonInput = document.getElementById("jsonInput");

function handleJsonSelect(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
        const result = event.target.result;
        if (result) {
            loadProject(result);
        }
        imageInput.value = '';
    };
    reader.readAsText(file);
}

function uploadProject() {
    jsonInput.click();
}

jsonInput.addEventListener(CHANGE, handleJsonSelect);

