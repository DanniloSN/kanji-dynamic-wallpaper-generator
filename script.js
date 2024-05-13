const kanjiElement = document.getElementById("kanji");
const kunyomiElement = document.getElementById("kunyomi");
const onyomiElement = document.getElementById("onyomi");
const meaningElement = document.getElementById("meaning");

const baseUrl = "https://kanjiapi.dev/v1/kanji/";
const query = new URLSearchParams(window.location.search);

async function generateWallpaper() {
  const filterQuery = query.get("filter");
  const kanjiListUrl = filterQuery ? `${baseUrl}${filterQuery}` : `${baseUrl}all`;

  const allKanjisRequest = await fetch(kanjiListUrl);
  if (!allKanjisRequest.ok) return onRequestError()
  const allKanjis = await allKanjisRequest.json();
  const randomKanji = allKanjis[Math.floor(Math.random() * allKanjis.length)];

  const kanjiRequest = await fetch(`${baseUrl}${randomKanji}`);
  if (!kanjiRequest.ok) return onRequestError()
  const kanjiData = await kanjiRequest.json();

  let meanings = [];
  if (kanjiData.heisig_en) meanings.push(kanjiData.heisig_en);
  if (kanjiData.meanings) meanings = meanings.concat(kanjiData.meanings);
  meanings = [...new Set(meanings)];

  kanjiElement.innerHTML = kanjiData.kanji;
  kunyomiElement.innerHTML = kanjiData.kun_readings.join(", ");
  onyomiElement.innerHTML = kanjiData.on_readings.join(", ");
  meaningElement.innerHTML = meanings.join(", ");
}

function onRequestError() {
  kanjiElement.innerHTML = "Error";
  kunyomiElement.remove();
  onyomiElement.remove();
  meaningElement.remove();
}

const interval = Number(query.get("interval") || 0);
if (interval > 0) {
  generateWallpaper();
  setInterval(generateWallpaper, interval * 1000 * 60);
} else {
  generateWallpaper();
}
