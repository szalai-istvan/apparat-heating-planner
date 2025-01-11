var panelInformation = {
    panelBlocks: [],
    addToPanels: function(type, alignment, pieces) {
        if (!scalingContext.pixelsPerMetersRatio) {
            alert('Panelek hozzáadása előtt fel kell venni a méretarányt!');
            return;
        }
        this.panelBlocks.push({
            type: type,
            alignment: alignment,
            pieces: pieces,
            position: {
                x: canvas.width / 2,
                y: canvas.height / 2
            },
            dimensions: {
                length: panelTypes[type].length,
                width: panelTypes[type].width
            }
        });
    },
    drawPanels: function() {
        for (let i = 0; i < this.panelBlocks.length; i++) {
            const panelBlock = this.panelBlocks[i];
            this.drawPanel(panelBlock);
        }
    },

    drawPanel: function(panel) {
        const screenCoordinates = displayContext.withDragOffsetAdded(panel.position);
        rect(
            screenCoordinates.x, 
            screenCoordinates.y, 
            panel.dimensions.length * displayContext.zoom * scalingContext.pixelsPerMetersRatio, 
            panel.dimensions.width * displayContext.zoom * scalingContext.pixelsPerMetersRatio);
    },

    offsetCenterPosition: function(offset) {
        this.panelBlocks.forEach(panelBlock => {
            panelBlock.position = {
                x: panelBlock.position.x + offset.x,
                y: panelBlock.position.y + offset.y,
            };
        });
    }
};

var panelTypes = {
    'AP100': {
        length: 1,
        width: 0.4,
        tubeAmount: 'todo'
    }
};