const buttonSize = {x: 120, y: 40};

function position(x) {
    return {x: 20 + x * (30 + buttonSize.x), y: 20};
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
}