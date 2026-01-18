class SlabHeaterManager____ {
    static getBoundaryPoints(slabHeater) {
        const horizontalAlignment = slabHeater.group.alignment % 2 === 0;
        const length = slabHeater.group.length;
        const width = slabHeater.group.width;

        if (horizontalAlignment) {
            return {
                p1: {x: slabHeater.centerPosition.x - length / 2, y: slabHeater.centerPosition.y - width / 2},
                p2: {x: slabHeater.centerPosition.x + length / 2, y: slabHeater.centerPosition.y + width / 2}
            };
        } else {
            return {
                p1: {x: slabHeater.centerPosition.x - width / 2, y: slabHeater.centerPosition.y - length / 2},
                p2: {x: slabHeater.centerPosition.x + width / 2, y: slabHeater.centerPosition.y + length / 2}
            };
        }
    }

    static rotateSelected(direction) {
        const slabHeater = slabHeaterContext.selectedSlabHeater;
        const group = slabHeater.group;

        if (!slabHeater) {
            return;
        }

        group.alignment = (group.alignment + Math.sign(direction)) % 4;
        while (group.alignment < 0) {
            group.alignment += 4;
        }
        SlabHeaterGroupManager.updatePosition(group);
    }
}