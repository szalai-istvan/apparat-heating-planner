const minimumFunction = (a, b) => (a < b ? a : b);
const maximumFunction = (a, b) => (a > b ? a : b);
const sumFunction = (a, b) => a + b;

function calculateDistance(p1, p2) {
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function topRibbonButtonPosition(topRibbonButtonSizes) {
  const sumButtonWidth = topRibbonButtonSizes
    .map((trbs) => trbs.x)
    .reduce(sumFunction, 0);
  const sumGap = (topRibbonButtonSizes.length + 1) * BUTTON_GAP_X;
  return {
    x: 100 + sumButtonWidth + sumGap,
    y: 10,
  };
}

function sidePanelButtonPosition(sideRibbonButtonSizes) {
  const sumButtonHeight = sideRibbonButtonSizes
    .map((trbs) => trbs.y)
    .reduce(sumFunction, 0);
  const sumGap = (sideRibbonButtonSizes.length + 1) * BUTTON_GAP_Y;
  return {
    x: 10,
    y: 55 + sumButtonHeight + sumGap,
  };
}

function bottomPosition(size) {
  return { x: 10, y: window.innerHeight - 10 - size.y };
}

function addTopRibbonDelimeter(x) {
  DELIMITER_POSITIONS.push({
    p1: { x: x, y: 0 },
    p2: { x: x, y: TOP_RIBBON_HEIGHT },
  });
}

function addLeftRibbonDelimeter(y) {
  y -= BUTTON_GAP_Y / 2;
  DELIMITER_POSITIONS.push({
    p1: { x: 0, y: y },
    p2: { x: LEFT_RIBBON_WIDTH, y: y },
  });
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
  if (!obj || typeof obj !== "object") {
    return null;
  }

  return obj.constructor.name;
}

const nfObject = new Intl.NumberFormat("en-US");
function formatNumber(num) {
  if (!num) return num;
  if (typeof num !== "number") return num;
  return nfObject.format(num).replaceAll(",", " ");
}

function roundNumber(number, decimals) {
  const x = 10 ** decimals;
  return Math.round(number * x) / x;
}

function displayHelpData() {
  displayMessage("Segítség kérése:<br/>e-mail: sjb@apparat.hu");
}

function calculateCorrector(lim, coord) {
  return (Math.abs(lim - coord) + lim - coord) / (2 * screenContext.zoom);
}
