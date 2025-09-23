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