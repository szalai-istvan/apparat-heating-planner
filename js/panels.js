var panelInformation = {
    panelBlocks: [],
    addToPanels: function(type, room, pieces) {
        if (!scalingContext.pixelsPerMetersRatio) {
            displayErrorMessage('Panelek hozzáadása előtt fel kell venni a méretarányt!');
            return;
        }
        this.panelBlocks.push(createPanelBlock(type, room, pieces));
    },
    drawPanels: function() {
        this.panelBlocks.forEach(panelBlock => this.drawPanelBlock(panelBlock));
    },

    drawPanelBlock: function(panel) {
        const screenCoordinates = displayContext.withDragOffsetAdded(panel.getTopLeftCoordinates());

        rect(
            screenCoordinates.x,
            screenCoordinates.y, 
            panel.dimensions.length * displayContext.zoom * scalingContext.pixelsPerMetersRatio, 
            panel.dimensions.width * displayContext.zoom * scalingContext.pixelsPerMetersRatio);       
    },

    offsetCenterPosition: function(offset) {
        this.panelBlocks.forEach(panelBlock => {
            panelBlock.centerPositison = {
                x: panelBlock.centerPositison.x + offset.x,
                y: panelBlock.centerPositison.y + offset.y,
            };
        });
    }
};

function createPanelBlock(type, room, pieces) {
    return {
        type: type,
        room: room,
        pieces: pieces,
        alignment: 0,
        centerPositison: {
            x: canvas.width / 2,
            y: canvas.height / 2
        },
        dimensions: {
            length: panelTypes[type].length,
            width: panelTypes[type].width
        },
        getTopLeftCoordinates: function() {
            return {
                x: this.centerPositison.x - 0.5 * this.dimensions.length * displayContext.zoom,
                y: this.centerPositison.y - 0.5 * this.dimensions.width * displayContext.zoom
            };
        }
    }
}

var panelTypes = {
    'AP100': {
        length: 1,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP150': {
        length: 1.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP200': {
        length: 2,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP250': {
        length: 2.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP300': {
        length: 3,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP350': {
        length: 3.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP400': {
        length: 4,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP450': {
        length: 4.5,
        width: 0.4,
        tubeAmount: 'todo'
    }
};

for (let type in panelTypes) {
    var option = document.createElement("option");
    option.text = type;
    option.value = type;
    addPanelTypeSelect.appendChild(option);
}