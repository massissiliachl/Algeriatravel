const axios = require("axios");
const fs = require("fs");

// 🔑 TA CLE API DEEPL
const API_KEY = "YOUR_DEEPL_API_KEY";

// 🔥 TES DONNEES FR (source unique)
const tours = [
  {
    id: 1,
    name: "Timimoun la Rouge",
    description: "Découvrez les dunes rouges de Timimoun"
  },
  {
    id: 2,
    name: "Le Tassili n'Ajjer",
    description: "Explorez les gravures rupestres"
  }
];

// 🌍 fonction traduction
async function translate(text) {
  const res = await axios.post(
    "https://api-free.deepl.com/v2/translate",
    new URLSearchParams({
      auth_key: API_KEY,
      text: text,
      target_lang: "EN"
    })
  );

  return res.data.translations[0].text;
}

// 🚀 génération complète
async function run() {
  const translated = [];

  for (const item of tours) {
    const name_en = await translate(item.name);
    const desc_en = await translate(item.description);

    translated.push({
      ...item,
      name_en,
      description_en: desc_en
    });
  }

  // 💾 sauvegarde JSON
  fs.writeFileSync(
    "./src/data/tours.en.json",
    JSON.stringify(translated, null, 2)
  );

  console.log("✅ Traduction terminée !");
}

run();