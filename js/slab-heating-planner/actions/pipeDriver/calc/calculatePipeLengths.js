/**
 * Kiszámítja a paraméterül kapott csőnyomvonalhoz tartozó csövek hosszát méterben, és visszaadja.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {Number[]}
 */
function calculatePipeLengths(pipeDriver) {
    pipeDriver = pipeDriver || selectedPipeDriver;
    
    if (!pipeDriver) {
        return;
    }

    const lengths = [];
    for (let pipe of pipeDriver.pipes) {
        let length = 0;
        for (let i = 0; i < pipe.length - 1; i++) {
            const p0 = pipe[i];
            const p1 = pipe[i + 1];

            const deltaX = Math.abs(p0.x - p1.x);
            const deltaY = Math.abs(p0.y - p1.y);

            length += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        }

        lengths.push(length);
    }

    return lengths.map(l => l / pixelsPerMetersRatio);
}