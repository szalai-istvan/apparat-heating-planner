function calculateDistance(p1, p2) {
    const deltaX = p2.x - p1.x;
    const deltaY = p2.y - p1.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function disableContextMenu() {
    for (let element of document.getElementsByTagName("body")) {
      element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
}

const minimumFunction = (a, b) => a < b ? a : b;
const maximumFunction = (a, b) => a > b ? a : b;