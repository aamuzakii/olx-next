const util = require("util");
const exec = util.promisify(require("child_process").exec);
import fs from "fs";

const command =
  'curl -o list.txt "https://www.olx.co.id/depok-kota_g4000024/disewakan-rumah-apartemen_c5160?filter=price_between_1700000_to_2000000,type_eq_rumah"';

export async function getManyHouses() {
  try {
    // const { stdout, stderr } = await exec(command);
    // console.error(`stderr: ${stderr}`);

    fs.readFile("list.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      const { JSDOM } = require("jsdom");

      const dom = new JSDOM(data);

      // Access the document
      const document = dom.window.document;

      // Use querySelector to find the span with data-aut-id="itemPrice"
      const targetSpan = document.querySelector(
        'span[data-aut-id="itemPrice"]'
      );

      if (targetSpan) {
        const elementCollection =
          targetSpan.parentElement.parentElement.parentElement.parentElement;

        const loopable = elementCollection.children;

        for (let i = 0; i < loopable.length - 1; i++) {
          const element = loopable[i];

          const mma = element.children[0];

          console.log(mma.href);

          const image = mma.children[0];

          const imagebener = image.children[1];

          const htmlString = imagebener.innerHTML;

          const srcRegex = /src="([^"]+)"/;
          const match = htmlString.match(srcRegex);

          if (match) {
            const src = match[1];
            const arr = src.split(";");
            const link = arr[0];
            console.log(link);
          } else {
            console.log("src attribute not found");
          }

          const metadata = mma.children[1];

          const harga = metadata.children[0];
          const feature = metadata.children[1];
          const judul = metadata.children[2];
          const publishStr = metadata.children[3]?.children[1];

          console.log("==========");
        }
      } else {
        console.log("Span tag with data-aut-id='itemPrice' not found");
      }
    });
  } catch (error: any) {
    console.error(`error: ${error.message}`);
  }
}
