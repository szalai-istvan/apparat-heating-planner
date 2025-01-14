var dragContext = {
    dragStartPosition: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    drag: false,

    startDragging: function() {
        this.drag = true;
        this.dragStartPosition.x = mouseX;
        this.dragStartPosition.y = mouseY;
    },

    stopDragging: function() {
        this.drag = false;
        this.dragStartPosition.x = 0;
        this.dragStartPosition.y = 0;
        
        blueprintImageData.offsetCenterPosition(this.offset);
        panelInformation.offsetCenterPosition(this.offset);
        
        this.offset = {x: 0, y: 0};
    },

    recalculateDragOffset: function() {
        if (this.drag) {
            this.offset = {
                x: (mouseX - this.dragStartPosition.x) / displayContext.zoom, 
                y: (mouseY - this.dragStartPosition.y) / displayContext.zoom
            };
        }
    }
};

var panelDragContext = {
    dragStartPosition: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    drag: false,

    startDragging: function() {
        this.drag = true;
        this.dragStartPosition.x = mouseX;
        this.dragStartPosition.y = mouseY;
    },

    stopDragging: function() {
        this.drag = false;
        this.dragStartPosition.x = 0;
        this.dragStartPosition.y = 0;

        panelSelectionContext.offsetCenterPosition(this.offset);

        this.offset = {x: 0, y: 0};
    },

    recalculateDragOffset: function() {
        if (this.drag) {
            this.offset = {
                x: (mouseX - this.dragStartPosition.x) / displayContext.zoom, 
                y: (mouseY - this.dragStartPosition.y) / displayContext.zoom
            };
        }
        if (dragContext.drag) {
            this.offset.x -= dragContext.offset.x;
            this.offset.y -= dragContext.offset.y;
        }
    }
};