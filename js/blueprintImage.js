var blueprintImageData = {
    data: null, 
    centerPosition: {
        x: 0, 
        y: 0
    },

    draw: function() {
        if (this.data) {

            const topLeftPosition = {
                x: this.centerPosition.x - 0.5 * displayContext.zoom * this.data.width,
                y: this.centerPosition.y - 0.5 * displayContext.zoom * this.data.height
            };
            const screenCoordinates = displayContext.withDragOffsetAdded(topLeftPosition);

            image(this.data, 
                screenCoordinates.x,
                screenCoordinates.y,
                this.data.width * displayContext.zoom,
                this.data.height * displayContext.zoom
            );
        }
    },

    offsetCenterPosition: function(offset) {
        this.centerPosition = {
            x: this.centerPosition.x + offset.x,
            y: this.centerPosition.y + offset.y
        };
    }
};