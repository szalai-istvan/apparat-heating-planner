import { Constants } from "../appdata/Constants.js";

let apparatLogo = null;
let cicisNeni = null;

/**
 * Betölti a képi elemeket.
 * 
 * @returns {undefined}
 */
function loadImageAssets() {
    apparatLogo = loadImage(Constants.resources.apparatLogoPath);
    cicisNeni = loadImage(Constants.resources.cicisNeniPath);
}

function getApparatLogo() {
    return apparatLogo;
}

function getCicisNeni() {
    return cicisNeni;
}

/**
 * Képi elemek kezelésével kapcsolatos függvények gyüjteménye.
 */
export const ImageAssets = {
    loadImageAssets,
    getApparatLogo,
    getCicisNeni
};