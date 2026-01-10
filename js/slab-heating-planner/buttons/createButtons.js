//Project-specific

function createButtons() { //Project-Specific
    const topRibbonButtonSizes = [];
    const leftRibbonButtonSizes = [];
    createCommonButtons(topRibbonButtonSizes, leftRibbonButtonSizes);

    leftRibbonButtonSizes.push({ x: 0, y: UI_TEXT_SIZE / 2 });
    addSidePanelText('Födémfűtés elemek', sidePanelButtonPosition(leftRibbonButtonSizes).y);
    leftRibbonButtonSizes.push({ x: 0, y: UI_TEXT_SIZE / 2 });

    slabHeaterWidthOptionsBar = new OptionsBar({
        topLeftPosition: sidePanelButtonPosition(leftRibbonButtonSizes),
        buttonSize: HALF_WIDTH_BUTTON_SIZE,
        gap: { x: 0, y: BUTTON_GAP_Y / 2 },
        columns: [{ buttons: [SLAB_HEATER_TYPES.width[0]] }, { buttons: [SLAB_HEATER_TYPES.width[1]] }],
        valueResolver: optionsBar => optionsBar.selected[0] ? Number(optionsBar.selected[0]) : undefined,
        onchange: () => updateSelectedSlabHeaterGroupDimensions(),
        title: 'Szélesség (m)',
        perColumnSelection: false,
        shouldBeRendered: () => configuredRoomsExist()
    });
    leftRibbonButtonSizes.push({ x: 0, y: HALF_WIDTH_BUTTON_SIZE.y / 3 });
    leftRibbonButtonSizes.push({ x: 0, y: HALF_WIDTH_BUTTON_SIZE.y / 2 });

    slabHeaterLengthOptionsBar = new OptionsBar({
        topLeftPosition: sidePanelButtonPosition(leftRibbonButtonSizes),
        buttonSize: HALF_WIDTH_BUTTON_SIZE,
        gap: { x: 0, y: BUTTON_GAP_Y / 2 },
        columns: [{ header: 'm', buttons: SLAB_HEATER_TYPES.length.m }, { header: 'cm', buttons: SLAB_HEATER_TYPES.length.cm }],
        valueResolver: optionsBar => resolveSlabHeaterLengthOptionBarValue(optionsBar),
        onchange: () => updateSelectedSlabHeaterGroupDimensions(),
        shouldBeRendered: () => configuredRoomsExist(),
        title: 'Hosszúság'
    });
    leftRibbonButtonSizes.push({ x: 0, y: HALF_WIDTH_BUTTON_SIZE.y / 3 });
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);

    addSlabHeaterButton = new ButtonWrapper({
        text: 'Hozzáadás',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => createSlabHeaterGroup(),
        shouldBeRendered: () => slabHeaterLengthOptionsBar.allValuesAreSet() && slabHeaterWidthOptionsBar.allValuesAreSet() && configuredRoomsExist()
    });
    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);
    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    leftRibbonButtonSizes.push({ x: 0, y: UI_TEXT_SIZE / 2 });
    addSidePanelText('Födémáttörések', sidePanelButtonPosition(leftRibbonButtonSizes).y);
    leftRibbonButtonSizes.push({ x: 0, y: UI_TEXT_SIZE / 2 });

    addBoxGroupButton = new ButtonWrapper({
        text: 'Hozzáadás',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => createBoxGroup(),
        shouldBeRendered: () => configuredRoomsExist()
    });

    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);
    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    deleteButton = new ButtonWrapper({
        text: 'Törlés',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => removeSelectedObject(),
        shouldBeRendered: () => selectedObject
    });
    leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);

    const rotatePosition = sidePanelButtonPosition(leftRibbonButtonSizes);
    rotateLeftButton = new ButtonWrapper({
        text: '↶',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: rotatePosition,
        onClick: () => rotateSelectedObject(-1),
        shouldBeRendered: () => selectedSlabHeaterGroup || selectedBoxGroup
    });

    rotatePosition.x += HALF_WIDTH_BUTTON_SIZE.x;
    rotateRightButton = new ButtonWrapper({
        text: '↷',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: rotatePosition,
        onClick: () => rotateSelectedObject(1),
        shouldBeRendered: () => selectedSlabHeaterGroup || selectedBoxGroup
    });
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);

    const groupManagerPosition = sidePanelButtonPosition(leftRibbonButtonSizes);
    removeFromGroupButton = new ButtonWrapper({
        text: '-',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: groupManagerPosition,
        onClick: () => removeLastFromSelectedGroup(),
        shouldBeRendered: () => selectedSlabHeaterGroup || selectedBoxGroup
    });

    groupManagerPosition.x += HALF_WIDTH_BUTTON_SIZE.x;
    addToGroupButton = new ButtonWrapper({
        text: '+',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: groupManagerPosition,
        onClick: () => addToSelectedGroup(),
        shouldBeRendered: () => selectedSlabHeaterGroup || selectedBoxGroup
    });
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);

    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);
    const downloadButtonPos = sidePanelButtonPosition(leftRibbonButtonSizes);
    downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: downloadButtonPos,
        onClick: () => openTransportDialog(),
        shouldBeRendered: () => fullyConfiguredSlabHeaterGroupsExist()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    helpButton = new ButtonWrapper({
        text: 'Segítség',
        size: SMALL_BUTTON_SIZE,
        position: bottomPosition(SMALL_BUTTON_SIZE),
        onClick: () => displayHelpData(),
        shouldBeRendered: () => true
    });
}