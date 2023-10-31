import { convertCurrencyStringToNumber } from "@/app/helper";
import { format, sub } from "date-fns";
import fs from "fs/promises"; // Import fs.promises for async file operations
const { JSDOM } = require("jsdom");

const depok = "depok-kota_g4000024";
const bogorKab = "bogor-kab_g4000004";
const bekasiKota = "bekasi-kota_g4000020";
const bogorKota = "bogor-kota_g4000021";

const command =
  'curl -o list.txt "https://www.olx.co.id/depok-kota_g4000024/disewakan-rumah-apartemen_c5160?filter=price_between_1700000_to_2000000,type_eq_rumah"';

export async function getManyHouses() {
  let arr = [];
  try {
    // Use await with fs.promises.readFile for async file reading
    const data = await fs.readFile("list.txt", "utf8");

    const dom = new JSDOM(data);
    const document = dom.window.document;

    const targetSpan = document.querySelector('span[data-aut-id="itemPrice"]');

    if (targetSpan) {
      const elementCollection =
        targetSpan.parentElement.parentElement.parentElement.parentElement;
      const loopable = elementCollection.children;

      for (let i = 0; i < loopable.length - 1; i++) {
        let imageUrl;
        const element = loopable[i];
        const anchor = element.children[0];
        const linkStr = anchor.href;
        if (!linkStr) continue;
        const image = anchor.children[0];
        const imagebener = image.children[1];
        const htmlString = imagebener.innerHTML;
        const srcRegex = /src="([^"]+)"/;
        const match = htmlString.match(srcRegex);

        if (match) {
          const src = match[1];
          imageUrl = src;
        } else {
          console.error("src attribute not found");
        }

        const metadata = anchor.children[1];
        const harga = metadata.children[0]?.textContent;
        const feature = metadata.children[1]?.textContent;
        const judul = metadata.children[2]?.textContent;
        let publishStr = metadata.children[3]?.children[1]?.textContent;

        if (publishStr === "Kemarin") {
          const today = new Date();
          const yesterday = sub(today, { days: 1 });
          publishStr = format(yesterday, "dd MMM");
        }

        if (publishStr === "Hari ini") {
          const today = new Date();
          publishStr = format(today, "dd MMM");
        }

        const finalObj = {
          url: "https://www.olx.co.id" + linkStr,
          price: convertCurrencyStringToNumber(harga),
          publishedStr: publishStr,
          imageUrl,
        };

        // console.log(finalObj);
        arr.push(finalObj);
      }
    } else {
      console.error("Span tag with data-aut-id='itemPrice' not found");
    }
  } catch (error: any) {
    console.error(`error: ${error.message}`);
  } finally {
    return arr;
  }
}
