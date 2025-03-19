class PanelManager {

    static mouseCursorIsInsideText(panel) {
        const width = panel.textWidth;
        const height = panel.widthInPixels * panel.numberOfPanelsInGroup * PANEL_SELECTION_MULTIPLIER;
        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            panel.getGroupCenterPositionAbsolute(),
            panel.alignment ? height : width,
            panel.alignment ? width : height
        );
    }


    static getTopLeftCornerCoordinates(panel, alignment = undefined) {
        alignment = alignment ?? panel.alignment;

        if (alignment === panel.alignment) {
            return panel.topLeftCoordinates;
        }

        const offsetX = (panel.lengthInPixels + panel.widthInPixels * panel.numberOfPanelsInGroup) / 2;
        const offsetY = (panel.widthInPixels * panel.numberOfPanelsInGroup - panel.lengthInPixels) / 2;
        const alignmentMultiplier = -1 * ((-1) ** alignment);

        return {
            x: panel.topLeftCoordinates.x + alignmentMultiplier * offsetX,
            y: panel.topLeftCoordinates.y + alignmentMultiplier * offsetY
        };
    }

    static getGroupCenterPositionAbsolute(panel) {
        const position = panel.topLeftCoordinates;
        if (panel.alignment) {
            return {
                x: position.x - panel.widthInPixels * 0.5 * panel.numberOfPanelsInGroup,
                y: position.y + panel.lengthInPixels * 0.5
            };
        }
        return {
            x: position.x + panel.lengthInPixels * 0.5,
            y: position.y + panel.widthInPixels * 0.5 * panel.numberOfPanelsInGroup
        };
    }

    static mousePositionAsCenterOfPanel(panel) {
        const mousePosition = screenContext.getMousePositionAbsolute();
        if (panel.alignment) {
            return {
                x: mousePosition.x + panel.widthInPixels * 0.5 * panel.numberOfPanelsInGroup,
                y: mousePosition.y - panel.lengthInPixels / 2
            };
        }
        return {
            x: mousePosition.x - panel.lengthInPixels / 2,
            y: mousePosition.y - panel.widthInPixels * 0.5 * panel.numberOfPanelsInGroup
        };
    }

    static rotate(panel) {
        const newAlignment = (panel.alignment + 1) % 2;
        const boundaryPoints = panel.getBoundaryPoints(panel.numberOfPanelsInGroup, newAlignment);
        if (panel.validateBoundaryPoints(boundaryPoints)) {
            if ((!panel.room) || (panel.room && panel.room.registerRotation(panel))) {
                panel.topLeftCoordinates = panel.getTopLeftCornerCoordinates(newAlignment);
                panel.alignment = newAlignment;
                panel.room && panel.room.recalculateBeams();
            }
        } else {
            displayErrorMessage('A forgatás hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt elforgatja!');
        }
    }

    static addToGroup(panel) {
        const newGroupNumber = (panel.numberOfPanelsInGroup + 1);
        const boundaryPoints = panel.getBoundaryPoints(newGroupNumber, panel.alignment);
        if (panel.validateBoundaryPoints(boundaryPoints)) {
            panel.numberOfPanelsInGroup = newGroupNumber;
            panel.room && panel.room.recalculateBeams();
        } else {
            displayErrorMessage('Újabb panel hozzáadásának hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt hozzáad a csoporthoz!');
        }
    }

    static removeFromGroup(panel) {
        panel.numberOfPanelsInGroup = Math.max(panel.numberOfPanelsInGroup - 1, 1);
        panel.room && panel.room.recalculateBeams();
    }

    static getSizeInPixels(panel) {
        return { length: panel.lengthInPixels, width: panel.widthInPixels };
    }


    static getFirstCenterPositionAbsolute(panel) {
        const position = panel.topLeftCoordinates;
        if (panel.alignment) {
            return {
                x: position.x - panel.widthInPixels * 0.5,
                y: position.y + panel.lengthInPixels * 0.5
            };
        }
        return {
            x: position.x + panel.lengthInPixels * 0.5,
            y: position.y + panel.widthInPixels * 0.5
        };
    }

    static getBoundaryPoints(panel, numberOfPanels = undefined, alignment = undefined) {
        numberOfPanels = numberOfPanels || panel.numberOfPanelsInGroup;
        alignment = alignment ?? panel.alignment;

        const coordinates = panel.isSelectedForDrag ? panel.mousePositionAsCenterOfPanel() : panel.getTopLeftCornerCoordinates(alignment);
        const extraLength = PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * scaleContext.pixelsPerMetersRatio;

        let p1;
        let p2;
        if (!alignment) {
            p1 = {
                x: coordinates.x - extraLength,
                y: coordinates.y
            };
            p2 = {
                x: coordinates.x + panel.lengthInPixels + extraLength,
                y: coordinates.y + panel.widthInPixels * numberOfPanels
            };
        } else {
            p1 = {
                x: coordinates.x,
                y: coordinates.y - extraLength
            };
            p2 = {
                x: coordinates.x - panel.widthInPixels * numberOfPanels,
                y: coordinates.y + panel.lengthInPixels + extraLength
            };
        }
               
        return {p1, p2};
    }

    static setType(panel, type) {
        const ratio = scaleContext.pixelsPerMetersRatio;

        panel.details = panelTypes[type];
        if (!panel.details) {
            throw new Error(`Unknown panel type: ${type}`);
        }
        
        panel.textSize = PANEL_TEXT_SIZE_IN_METERS * ratio;
        if (type === 'F100') {
            panel.textSize /= 2;
        }
        
        panel.type = type;
        textSize(panel.textSize);
        panel.textWidth = textWidth(panel.type);
        panel.topLeftCoordinates = screenContext.getMousePositionAbsolute();
        panel.lengthInPixels = panel.details.length * ratio;
        panel.widthInPixels = panel.details.width * ratio;
    }

    static validateBoundaryPoints(panel, boundaryPoints) {
        if (!panel.room || panel.isSelectedForDrag) {
            return true;
        }
        return panel.room.pointIsInsideRoom(boundaryPoints.p1) && panel.room.pointIsInsideRoom(boundaryPoints.p2);
    }
}