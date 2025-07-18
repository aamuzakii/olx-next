import { convertCurrencyStringToNumber } from "@/app/helper";
import { maxBudget } from "@/app/helper/general";
import { exec } from "child_process";
import { format, sub } from "date-fns";
import fs from "fs/promises";
const { JSDOM } = require("jsdom");
import { jsonrepair } from "jsonrepair";
import _ from "lodash";

function getAdAge(postedAt: string) {
  const postedDate = new Date(postedAt);
  const now = new Date();

  const diffMs = now - postedDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

const merk = "daihatsu-xenia";
const tahun = "2012";

export async function getHousesByCity(city: string) {
  // return []
  const sortByDate = "&sorting=desc-creation";
  const sortByRelevance = "&sorting=desc-relevance";
  const empty = "";

  const price = "4000000_to_90000000";

  const fileName = "list.txt";
  const webUrl = `https://www.olx.co.id/depok-kota_g4000024/mobil-bekas_c198/q-${tahun}?filter=m_seller_type_eq_seller-type-individu%2Cm_tipe_eq_mobil-bekas-${merk}%2Cprice_between_${price}`;
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

          const {
            price,
            images,
            locations_resolved,
            created_at_first,
            favorites,
          } = value;

          // convert title to dash
          const title = value.title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-");

          const url = `https://www.olx.co.id/item/${title}-iid-${value.id}`;

          const finalObj = {
            url,
            price: price.value.raw,
            publishedStr: `${locations_resolved.SUBLOCALITY_LEVEL_1_name} - ${locations_resolved.ADMIN_LEVEL_3_name}`,
            imageUrl: images[0].url,
            feature: "fitur",
            title: "judul",
            prefecture: "prefecture",
            warteg: favorites.count + " loved it",
            schoolDistance: getAdAge(created_at_first),
          };

          arr.push(finalObj);

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
