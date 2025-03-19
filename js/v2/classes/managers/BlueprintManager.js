class BlueprintManager {
        
    static getTopLeftCoordinates(blueprint) {
        const data = blueprint.data;
        if (!data) {
            return;
        }

        return {
            x: - 0.5 * data.width,
            y: - 0.5 * data.height
        };
    }
    
    static setBlueprintData(blueprint, data) {
        blueprint.data = data;
        tooltip.fileIsUploaded();
    }

    static dataIsPresent(blueprint) {
        return Boolean(blueprint.data);
    }

    static getSizeData(blueprint) {
        const data = blueprint.data;
        if (!data) {
            return;
        }

        const p = blueprint.getTopLeftCoordinates();
        return { x: p.x, y: p.y, w: data.width, h: data.height };
    }
}