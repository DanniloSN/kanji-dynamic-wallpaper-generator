const kanjiElement = document.getElementById("kanji");
const kunyomiElement = document.getElementById("kunyomi");
const onyomiElement = document.getElementById("onyomi");
const meaningElement = document.getElementById("meaning");

const baseUrl = "https://kanjiapi.dev/v1/kanji/";

async function generateWallpaper() {
  const allKanjisRequest = await fetch(`${baseUrl}all`);
  const allKanjis = await allKanjisRequest.json();
  const randomKanji = allKanjis[Math.floor(Math.random() * allKanjis.length)];

  const kanjiRequest = await fetch(`${baseUrl}${randomKanji}`);
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

generateWallpaper();
