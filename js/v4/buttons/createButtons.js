function createButtons() {
    const topRibbonButtonSizes = [];

    fileUploadButton = new ButtonWrapper({
        text: 'Alaprajz feltöltése',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => upload(),
        shouldBeActive: () => true
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    scaleButton = new ButtonWrapper({
        text: 'Méretarány felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => startScaling(),
        shouldBeActive: () => blueprintDataIsPresent()
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    addRoomsButton = new ButtonWrapper({
        text: 'Helyiség felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => showAddRoomDialog(),
        shouldBeActive: () => pixelsPerMetersRatio
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    addTopRibbonDelimeter(topRibbonButtonPosition(topRibbonButtonSizes).x);
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    const leftRibbonButtonSizes = [];

    new ButtonWrapper({
        text: 'Projekt mentése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => downloadProjectState(),
        shouldBeActive: () => true
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    new ButtonWrapper({
        text: 'Projekt betöltése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => uploadProject(),
        shouldBeActive: () => true
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    clearBlueprintsButton = new ButtonWrapper({
        text: 'Alaprajzok eltávolítása',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => promptToClearBlueprints(),
        shouldBeActive: () => blueprintDataIsPresent()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    for (let type in panelTypes) {
        new ButtonWrapper({
            text: type,
            size: SMALL_BUTTON_SIZE,
            position: sidePanelButtonPosition(leftRibbonButtonSizes),
            onClick: () => createOrReplacePanelGroup(type),
            shouldBeActive: () => configuredRoomsExist()
        });
        leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);
    }

    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    new ButtonWrapper({
        text: 'Forgatás',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => rotateSelectedObject(),
        shouldBeActive: () => selectedPanelGroup || selectedBlueprint
    });
    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);

    const addButtonPosition = sidePanelButtonPosition(leftRibbonButtonSizes);
    new ButtonWrapper({
        text: '-',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: addButtonPosition,
        onClick: () => removePanelFromSelectedGroup(),
        shouldBeActive: () => selectedPanelGroup
    });

    addButtonPosition.x += HALF_WIDTH_BUTTON_SIZE.x;
    new ButtonWrapper({
        text: '+',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: addButtonPosition,
        onClick: () => addPanelToSelectedGroup(),
        shouldBeActive: () => selectedPanelGroup
    });
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);

    new ButtonWrapper({
        text: 'Törlés',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => removeSelectedObject(),
        shouldBeActive: () => selectedPanelGroup || selectedRoom || selectedBlueprint
    });
    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);

    const downloadButtonPos = sidePanelButtonPosition(leftRibbonButtonSizes);
    downloadButtonPos.y += SMALL_BUTTON_SIZE.y + BUTTON_GAP_Y;
    downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: downloadButtonPos,
        onClick: () => openTransportDialog(),
        shouldBeActive: () => panelGroupsExist()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    helpButton = new ButtonWrapper({
        text: 'Segítség',
        size: SMALL_BUTTON_SIZE,
        position: bottomPosition(SMALL_BUTTON_SIZE),
        onClick: () => displayHelpData(),
        shouldBeActive: () => true
    });
}

function topRibbonButtonPosition(topRibbonButtonSizes) {
  const sumButtonWidth = topRibbonButtonSizes
    .map((trbs) => trbs.x)
    .reduce(sumFunction, 0);
  const sumGap = (topRibbonButtonSizes.length + 1) * BUTTON_GAP_X;
  return {
    x: 100 + sumButtonWidth + sumGap,
    y: 10,
  };
}

function sidePanelButtonPosition(sideRibbonButtonSizes) {
  const sumButtonHeight = sideRibbonButtonSizes
    .map((trbs) => trbs.y)
    .reduce(sumFunction, 0);
  const sumGap = (sideRibbonButtonSizes.length + 1) * BUTTON_GAP_Y;
  return {
    x: 10,
    y: 55 + sumButtonHeight + sumGap,
  };
}

function bottomPosition(size) {
  return { x: 10, y: window.innerHeight - 10 - size.y };
}

function addTopRibbonDelimeter(x) {
  DELIMITER_POSITIONS.push({
    p1: { x: x, y: 0 },
    p2: { x: x, y: TOP_RIBBON_HEIGHT },
  });
}

function addLeftRibbonDelimeter(y) {
  y -= BUTTON_GAP_Y / 2;
  DELIMITER_POSITIONS.push({
    p1: { x: 0, y: y },
    p2: { x: LEFT_RIBBON_WIDTH, y: y },
  });
}