const buttonSize = {x: 120, y: 40};

function position(col, row = 0) {
    return {x: 20 + col * (30 + buttonSize.x), y: 20 + row * (30 + buttonSize.y)};
}

function createButtons() {
    fileUploadButton = new ButtonWrapper({
        text: 'Fájl feltöltése',
        size: buttonSize,
        position: position(0),
        onClick: () => upload(),
        shouldBeRendered: () => true
    });

    scaleButton = new ButtonWrapper({
        text: 'Méretarány felvétele',
        size: buttonSize,
        position: position(1),
        onClick: () => scaleContext.startScaling(),
        shouldBeRendered: () => blueprint.dataIsPresent()
    });

    addRoomsButton = new ButtonWrapper({
        text: 'Szoba felvétele',
        size: buttonSize,
        position: position(2),
        onClick: () => showAddRoomDialog(),
        shouldBeRendered: () => scaleContext.ratioIsSet()
    });

    deleteRoomButton = new ButtonWrapper({
        text: 'Szoba törlése',
        size: buttonSize,
        position: position(0, 1),
        onClick: () => roomContext.removeSelected(),
        shouldBeRendered: () => roomContext.displayDeleteButton()
    });
    
    let row = 2;
    for (let type in panelTypes) {
        addPanelButtons.push(new ButtonWrapper({
            text: type,
            size: buttonSize,
            position: position(0, row++),
            onClick: () => panelContext.addPanel(type),
            shouldBeRendered: () => roomContext.thereAreRooms()
        }));
    }
}