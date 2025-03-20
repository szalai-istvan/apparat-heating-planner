class BlueprintManager {
        
    static getTopLeftCoordinates(blueprint) {
        const data = blueprint.data;

        if (!blueprint.topLeftPosition) {
            if (data.width > 1 && data.height > 1) {
                blueprint.topLeftPosition = {
                    x: - 0.5 * data.width,
                    y: - 0.5 * data.height
                };    
            } else {
                return undefined;
            }
        }

        return blueprint.topLeftPosition;
    }

    static dataIsPresent(blueprint) {
        return Boolean(blueprint.data);
    }

    static getSizeData(blueprint) {
        const data = blueprint.data;

        return { x: blueprint.topLeftPosition.x, y: blueprint.topLeftPosition.y, w: data.width, h: data.height };
    }

    static remove(blueprint) {
        renderer.remove(blueprint);
    }
}