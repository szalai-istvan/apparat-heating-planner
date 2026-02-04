import { Constants } from "../../appdata/Constants.js";
import { Load } from "../../io/load.js";

var jsonInput = document.getElementById("jsonInput");
const imageInput = document.getElementById('imageInput');

function handleJsonSelect(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
        const result = event.target.result;
        if (result) {
            Load.loadProject(result.toString());
        }
        imageInput.value = '';
    };
    reader.readAsText(file);
}

/**
 * Projekt betöltése fájlból
 */
function uploadProject() {
    jsonInput.click();
}

jsonInput.addEventListener(Constants.strings.change, handleJsonSelect);

/**
 * Projekt betöltése fájlból
 */
export const LoadProjectButton = {
    uploadProject
};