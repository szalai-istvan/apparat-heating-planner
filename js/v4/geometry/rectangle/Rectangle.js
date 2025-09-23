class Rectangle {
    /** @type {Point[]} */
    points = [];
    /** @type {Line[]} */
    lines = [];
    /** @type {Point} */
    middlePoint

    constructor(points) {
        if (!points || points.length !== 4) {
            throw new Error($`Rectangle definition needs exactly four points. ${points.length} provided`);
        }
        this.points = points;

        let index = 0;
        while (index < 4) {
            this.lines.push(createLine(points[index], points[(index + 1) % 4]));
            index+=1;
        }

        const middleX = points.map(p => p.x).reduce(sumFunction) / 4;
        const middleY = points.map(p => p.y).reduce(sumFunction) / 4;
        this.middlePoint = createPoint(middleX, middleY);
    }
}