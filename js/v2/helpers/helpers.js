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

function disableEscapeButton() {
  for (let element of document.getElementsByTagName('dialog')) {
    element.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        event.preventDefault();
    }
    });
  }
}

function handleWindowResize() {
  window.addEventListener('resize', () => {
    if (canvas) {
      docSize = getDocumentDimensions();
      const width = docSize.vw;
      const height = window.innerHeight;
      canvas.canvas.style = `width: ${width}px; height: ${height}px;`;
      canvas.width = width;
      canvas.height = height;
      resizeCanvas(windowWidth, windowHeight);
    }
  });
}

const minimumFunction = (a, b) => a < b ? a : b;
const maximumFunction = (a, b) => a > b ? a : b;

function topRibbonButtonPosition(col) {
    return {x: -20 + col * (20 + REGULAR_BUTTON_SIZE.x), y: 10};
}

function sidePanelButtonPosition(row) {
    return {x: 10, y: 70 + row * (SMALL_BUTTON_SIZE.y + 5)};
}

function tooltipPosition() {
  const button4Position = topRibbonButtonPosition(4);
  return {x: button4Position.x, y: button4Position.y + REGULAR_BUTTON_SIZE.y / 2};
}

function pointIsInside(point, middlePoint, areaWidth, areaHeight) {
  const x = point.x;
  const y = point.y;
  let minX, maxX, minY, maxY;

  minX = middlePoint.x - areaWidth / 2;
  maxX = middlePoint.x + areaWidth / 2;
  
  minY = middlePoint.y - areaHeight / 2;
  maxY = middlePoint.y + areaHeight / 2;

  return x > minX && x < maxX && y > minY && y < maxY;
}

function getClassName(obj) {
  if (!obj || typeof(obj) !== 'object') {
      return null;
  }

  return obj.constructor.name;
}

const nfObject = new Intl.NumberFormat('en-US')
function formatNumber(num) {
  if (!num) return num;
  if (typeof(num) !== 'number') return num;
  return nfObject.format(num).replaceAll(',', ' ');
}