function createButtons() {
    console.log('createButtons');
    const topRibbonButtonSizes = [];
    const leftRibbonButtonSizes = [];
    createCommonButtons(topRibbonButtonSizes, leftRibbonButtonSizes);

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
        shouldBeActive: () => panelGroupsExist() && !(selectedPanelGroup?.isSelectedForDrag)
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