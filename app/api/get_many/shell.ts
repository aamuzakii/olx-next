import { convertCurrencyStringToNumber } from "@/app/helper";
import { maxBudget } from "@/app/helper/general";
import { exec } from "child_process";
import { format, sub } from "date-fns";
import fs from "fs/promises";
const { JSDOM } = require("jsdom");
import { jsonrepair } from "jsonrepair";
import _ from "lodash";

export async function getHousesByCity(city: string) {
  // return []
  const sortByDate = "&sorting=desc-creation";
  const sortByRelevance = "&sorting=desc-relevance";
  const empty = "";

  const monthlyBoros = "1700000_to_2500000";
  const monthly = `1700000_to_${maxBudget}`;
  const yearly = "20000000_to_25000000";

  const fileName = "list.txt";
  const webUrl = `https://www.olx.co.id/depok-kota_g4000024/mobil-bekas_c198/q-2012?filter=m_seller_type_eq_seller-type-individu%2Cm_tipe_eq_mobil-bekas-suzuki-ertiga%2Cmake_eq_mobil-bekas-suzuki%2Cprice_between_4000000_to_100000000`;
  const command = `curl -o ${fileName} "${webUrl}"`;
  console.info(webUrl);

  let arr: any[] = [];
  try {
    const { stdout, stderr } = await exec(command);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await fs.readFile(fileName, "utf8");

    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Extract window.__APP JSON from script tag
    const scripts = document.querySelectorAll("script");

    let appScriptContent = "";
    scripts.forEach((script: { textContent: string }, idx: number) => {
      const text = script.textContent || "";
      if (idx === 5) {
        appScriptContent = text;
      }
    });

    const raw = appScriptContent.slice(0, 500000);

    try {
      const match = raw.match(/window\.__APP\s*=\s*({[\s\S]*)$/);
      if (match) {
        const brokenJson = match[1];
        const repaired = jsonrepair(brokenJson);
        const app = JSON.parse(repaired);
        // console.log(app.states);

        const mama = app.states.items.elements;
        console.dir(mama, { depth: null });
        await fs.writeFile("app_states.json", JSON.stringify(mama, null, 2));

        const result = _.map(mama, (value, key) => {
          console.log(value.title, "<< value");

          const { price, images } = value;

          // convert title to dash
          const title = value.title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-");

          const url = `https://www.olx.co.id/item/${title}-iid-${value.id}`;

          const finalObj = {
            url,
            price: price.value.raw,
            publishedStr: "gatau",
            imageUrl: images[0].url,
            feature: "",
            title,
            prefecture: "",
          };

          arr.push(finalObj);

          console.log(url, "<< url");

          return { key, value };
        });
      } else {
        console.error("No match found for window.__APP");
      }
    } catch (err: any) {
      console.error("Could not parse JSON:", err.message);
    }

    // export to a file json app.states
  } catch (error: any) {
    console.error(`error: ${error.message}`);
  } finally {
    return arr;
  }
}
