class PanelSelector {

    static select(panel) {
        panel.isSelected = true;
    }

    static selectForDrag(panel) {
        panel.isSelected = true;
        panel.isSelectedForDrag = true;
        panel.room && RoomManager.removePanelFromRoom(panel.room, panel);
        panel.room = undefined;
    }

    static tryToDeselect(panel) {
        if (panel.isSelectedForDrag) {
            panel.topLeftCoordinates = PanelManager.mousePositionAsCenterOfPanel(panel);
        }

        const destinationRoom = roomContext.registerRelocatedPanelGroupAndReturnContainingRoom(panel);
        if (!destinationRoom) {
            return false;
        }
        panel.room = destinationRoom;

        panel.isSelected = false;
        panel.isSelectedForDrag = false;

        return true;
    }

    static remove(panel) {
        renderer.remove(panel);
        panel.room && RoomManager.removePanelFromRoom(panel.room, panel);
        panel.room = undefined;
    }
}