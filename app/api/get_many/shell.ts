import { convertCurrencyStringToNumber } from "@/app/helper";
import { exec } from "child_process";
import { format, sub } from "date-fns";
import fs from "fs/promises";
const { JSDOM } = require("jsdom");

export async function getHousesByCity(city: string) {
  const sortByDate = "&sorting=desc-creation";
  const sortByRelevance = "&sorting=desc-relevance";
  const empty = "";

  const monthly = "1700000_to_2500000";
  // const yearly = "20000000_to_30000000";

  const fileName = "list.txt";
  const webUrl = `https://www.olx.co.id/${city}/disewakan-rumah-apartemen_c5160?filter=p_bedroom_eq_2%2B%2Cprice_between_${monthly},type_eq_rumah${sortByDate}`;
  const command = `curl -o ${fileName} "${webUrl}"`;
  console.info(webUrl);

  let arr = [];
  try {
    const { stdout, stderr } = await exec(command);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await fs.readFile(fileName, "utf8");

    const dom = new JSDOM(data);
    const document = dom.window.document;

    const targetSpan = await document.querySelector(
      'span[data-aut-id="itemPrice"]'
    );

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

        const firstContent = metadata.children[0]?.textContent;
        const hasHighlight = firstContent === "Highlight";
        const p = hasHighlight ? 1 : 0;

        const harga = metadata.children[0 + p]?.textContent;
        const feature = metadata.children[1 + p]?.textContent;
        const title = metadata.children[2 + p]?.textContent;
        let publishStr = metadata.children[3 + p]?.children[1]?.textContent;
        let prefecture = metadata.children[3 + p]?.children[0]?.textContent;

        const isJakarta = prefecture.split(" ").includes("Jakarta");
        if (isJakarta) continue;

        if (publishStr === "Kemarin") {
          const today = new Date();
          const yesterday = sub(today, { days: 1 });
          publishStr = format(yesterday, "dd MMM");
        }

        if (publishStr === "Hari ini") {
          const today = new Date();
          publishStr = format(today, "dd MMM");
        }

        const subString = "hari yang lalu";

        if (publishStr?.includes(subString)) {
          const nDaysAgo: string = publishStr.split(subString)[0];
          const today = new Date();
          const thatDay = sub(today, { days: Number(nDaysAgo) });
          publishStr = format(thatDay, "dd MMM");
        }

        const finalObj = {
          url: "https://www.olx.co.id" + linkStr,
          price: convertCurrencyStringToNumber(harga),
          publishedStr: publishStr,
          imageUrl,
          feature,
          title,
          prefecture,
        };

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
