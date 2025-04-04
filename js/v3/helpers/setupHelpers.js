const MODALS = [errorDialog, fileUploadDialogConfirm, scalingDialogConfirm, scalingDialog, addRoomDialog, pdfUploadDialog, summaryTableDialog, transportDialog];
const ENTERABLE_BUTTONS = [errorMessageOkButton, fileUploadDialogConfirmButton, scalingDialogConfirmButton, scalingDialogCloseButton, addRoomButton, pdfUploadDialogCloseButton, transportDialogOkButton];

function disableContextMenu() {
  for (let element of document.getElementsByTagName("body")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}

function disableEscapeButton() {
  for (let element of document.getElementsByTagName("dialog")) {
    element.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    });
  }
}

function handleDeleteButton() {
  for (let element of document.getElementsByTagName("body")) {
    element.addEventListener("keydown", (event) => {
      if (event.key === "Delete") {
        selectionContext.removeSelected();
      }
    });
  }
}

function handleWindowResize() {
  window.addEventListener("resize", () => {
    if (canvas) {
      docSize = getDocumentDimensions();
      const width = docSize.vw;
      const height = window.innerHeight;
      canvas.canvas.style = `width: ${width}px; height: ${height}px;`;
      canvas.width = width;
      canvas.height = height;
      resizeCanvas(windowWidth, windowHeight);

      const helpButtonPos = bottomPosition(TALL_SMALL_BUTTON_SIZE);
      helpButton.button.position(helpButtonPos.x, helpButtonPos.y);
    }
  });
}

function enableEnterForConfirm() {
  window.addEventListener("keypress", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const button = ENTERABLE_BUTTONS.filter((e) => e.checkVisibility())[0];
    button && button.click();
  });
}

function noModalsAreOpened() {
  return (
    MODALS.filter((modal) => modal.getAttribute("open") !== null).length === 0
  );
}
