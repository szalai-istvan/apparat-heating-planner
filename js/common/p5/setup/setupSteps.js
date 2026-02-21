import { SelectionAPI } from "../../api/SelectionAPI.js";
import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { DocumentData } from "../../ui/DocumentData.js";

/**
 * Letiltja a jobb egérgomb megnyomására felugró kontext menü megjelenítését.
 * 
 * @returns {undefined}
 */
function disableContextMenu() {
    for (let element of document.getElementsByTagName(Constants.strings.body)) {
        element.addEventListener(Constants.strings.contextmenu, (e) => e.preventDefault());
    }
}

/**
 * Letiltja az Esc billentyű default működését
 * 
 * @returns {undefined}
 */
function disableEscapeButton() {
    for (let element of document.getElementsByTagName(Constants.strings.dialog)) {
        element.addEventListener(Constants.strings.keydown, (event) => {
            if (event.key === Constants.strings.escape) {
                event.stopImmediatePropagation();
                event.preventDefault();
            }
        });
    }
}

/**
 * Felvesz a Delete gomb lenyomására egy eseményfigyelőt, amely a kiválasztott elemet törli.
 * 
 * @returns {undefined}
 */
function handleDeleteButton() {
    for (let element of document.getElementsByTagName(Constants.strings.body)) {
        element.addEventListener(Constants.strings.keydown, (event) => {
            if (event.key === Constants.strings.delete) {
                SelectionAPI.removeSelectedObject()
            }
        });
    }
}

/**
 * Felvesz az ablak méretének megváltozására egy eseményfigyelőt.
 * 
 * @returns {undefined}
 */
function handleWindowResize() {
    window.addEventListener(Constants.strings.resize, () => {
        const canvas = ApplicationState.canvas;
        if (!canvas) {
            return;
        }

        const docSize = DocumentData.getDocumentSize();
        const width = docSize.x;
        const height = window.innerHeight;
        canvas.canvas.style = `width: ${width}px; height: ${height}px;`;
        canvas.width = width;
        canvas.height = height;
        resizeCanvas(width, height);
    });
}

/**
 * Lehetővé teszi a dialógusok Enter billentyűvel történő elfogadását.
 * 
 * @returns {undefined}
 */
function enableEnterForConfirm() {
    window.addEventListener(Constants.strings.keypress, (event) => {
        if (event.key !== Constants.strings.enter) {
            return;
        }

        const button = Constants.ui.enterableButtons.filter((e) => e.checkVisibility())[0];
        button.click();
    });
}

/**
 * Létrehozza a szobanév gyorskitöltő radio gombokat.
 * 
 * @returns {undefined}
 */
function createRoomPrefillRadioButtons() {
    const div = document.getElementById('roomPrefillRadioSet');
    for (let option of Constants.room.prefillRoomNames) {
        const onchange = () => addRoomInput.value = option;
        const radioButton = createRadioButton('roomPrefill', option, onchange);
        div.appendChild(radioButton);
        ApplicationState.roomPrefillButtons.push(radioButton);
    }
}

/**
 * Létrehoz egy rádio gombot és a hozzá tartozó címkét egy span elemben.
 * 
 * @param {string} name 
 * @param {string} value 
 * @param {Function} onchange 
 * @returns {HTMLSpanElement}
 */
function createRadioButton(name, value, onchange) {
    const input = document.createElement(Constants.strings.input);
    input.setAttribute(Constants.strings.type, Constants.strings.radio);
    const id = value.toLowerCase();
    input.setAttribute(Constants.strings.id, id);
    input.setAttribute(Constants.strings.name, name);
    input.setAttribute(Constants.strings.value, value);

    const label = document.createElement(Constants.strings.label);
    label.setAttribute(Constants.strings.for, id)
    label.innerHTML = value;
    label.classList.add(Constants.strings.radioLabel);

    const span = document.createElement(Constants.strings.span);
    span.appendChild(input);
    span.appendChild(label);
    input.addEventListener(Constants.strings.change, onchange);
    return span;
}

/**
 * Inicializálja a dialogok és enterezhető gombok listáját.
 * 
 * @returns {undefined}
 */
function initModalsAndEnterableButtons() {
    const enterText = '(' + Constants.strings.enter + ')';
    const buttons = Array.prototype.slice.call(document.getElementsByTagName(Constants.strings.button), 0)
        .filter(b => (b.innerHTML + '').includes(enterText));

    const modals = Array.prototype.slice.call(document.getElementsByTagName(Constants.strings.dialog), 0);

    Constants.ui.enterableButtons = buttons;
    modals.forEach(element => Constants.ui.modals.push(element));
}

/**
 * Inicializáció lépés függvények
 */
export const SetupSteps = {
    disableContextMenu,
    disableEscapeButton,
    handleWindowResize,
    enableEnterForConfirm,
    handleDeleteButton,
    createRoomPrefillRadioButtons,
    initModalsAndEnterableButtons
};