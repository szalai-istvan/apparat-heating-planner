/**
 * Letiltja a jobb egérgomb megnyomására felugró kontext menü megjelenítését.
 * 
 * @returns {undefined}
 */
function disableContextMenu() {
    for (let element of document.getElementsByTagName(BODY)) {
        element.addEventListener(CONTEXTMENU, (e) => e.preventDefault());
    }
}

/**
 * Letiltja az Esc billentyű default működését
 * 
 * @returns {undefined}
 */
function disableEscapeButton() {
    for (let element of document.getElementsByTagName(DIALOG)) {
        element.addEventListener(KEYDOWN, (event) => {
            if (event.key === ESCAPE) {
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
    for (let element of document.getElementsByTagName(BODY)) {
        element.addEventListener(KEYDOWN, (event) => {
            if (event.key === DELETE) {
                selectionContext.removeSelected(); // TODO
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
    window.addEventListener(RESIZE, () => {
        if (!canvas) {
            return;
        }

        docSize = getDocumentDimensions();
        const width = docSize.vw;
        const height = window.innerHeight;
        canvas.canvas.style = `width: ${width}px; height: ${height}px;`;
        canvas.width = width;
        canvas.height = height;
        resizeCanvas(windowWidth, windowHeight);

        const helpButtonPos = bottomPosition(TALL_SMALL_BUTTON_SIZE);
        helpButton.button.position(helpButtonPos.x, helpButtonPos.y);
    });
}

/**
 * Lehetővé teszi a dialógusok Enter billentyűvel történő elfogadását.
 * 
 * @returns {undefined}
 */
function enableEnterForConfirm() {
  window.addEventListener(KEYPRESS, (event) => {
    if (event.key !== ENTER) {
      return;
    }

    const button = ENTERABLE_BUTTONS.filter((e) => e.checkVisibility())[0];
    button && button.click();
  });
}