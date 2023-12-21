import fs from 'fs'

fs.readFile("./assets/resource", "utf8", async (error, data) => {
  if (error) {
    console.error(error);
  }

  const kanji_data = data.split("\n");

  const mod_data = kanji_data.reduce((a, c) => {
    const kanji = c.match(/[\u4e00-\u9fff]+/g);
    const reading_kr = c.match(/=([^,]+),/g);
    const reading_en = c.match(/[a-zA-Z]+/g);
    const stroke = c.match(/[0-9]+/g);

    if (kanji !== null && reading_kr !== null) {
      a.push({
        kanji: kanji[0],
        reading_en: reading_en ? reading_en : null,
        reading_kr: reading_kr ? reading_kr[0].replace(/[=,]/g, "") : null,
        stroke: stroke[0],
      });
    }
    return a;
  }, []);

  result = JSON.stringify(mod_data);

  fs.writeFile("./output/result.json", JSON.stringify(mod_data), (error) => {
    if (error) console.log(error);
  });
});
