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

        for (let i = 0; i < 1; i++) {
          const element = loopable[i];

          const mma = element.children[0];

          console.log(mma.href);

          const image = mma.children[0];
          const metadata = mma.children[1];
          console.log(metadata.children.length);

          for (let i = 0; i < metadata.children.length; i++) {
            console.log(metadata.children[i].textContent);
          }
        }
      } else {
        console.log("Span tag with data-aut-id='itemPrice' not found");
      }

      const pattern = /<[^>]+data-aut-id="itemBox"[^>]*>.*?<\/[^>]+>/g;

      const matches = data.match(pattern);

      if (matches) {
        // for (let i = 0; i < matches.length - 19; i++) {
        //   const hrefPattern = /href="([^"]+)"/;
        //   const match = matches[i].match(hrefPattern);
        //   if (match) {
        //     const hrefContent = match[1];
        //     const fullLink = `https://www.olx.co.id${hrefContent}`;
        //     getHouseDetail(fullLink);
        //   } else {
        //     console.error("href attribute not found");
        //   }
        // }
      } else {
        console.error("No matching tags found in the HTML content.");
      }
    });
  } catch (error: any) {
    console.error(`error: ${error.message}`);
  }
}

export async function getHouseDetail(link: string) {
  const fileName = `${link.replaceAll("/", "-")}.txt`;

  const command = `curl -o ${fileName} "${link}"`;

  try {
    const { stdout, stderr } = await exec(command);
    console.error(`stderr: ${stderr}`);

    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      var Imgpattern = /apollo-singapore(.*?)"[^"]+/;

      var imgList = data.match(Imgpattern);

      if (imgList) {
        var extractedText = imgList[1];
        console.log(extractedText);
      } else {
        console.error("No match found.");
      }

      const { JSDOM } = require("jsdom");

      const dom = new JSDOM(data);

      // Access the document
      const document = dom.window.document;

      // Use querySelector to find the span with data-aut-id="itemPrice"
      const targetSpan = document.querySelector('span[data-aut-id="itemList"]');

      if (targetSpan) {
        console.log(targetSpan.textContent); // Print the text inside the found span
      } else {
        console.log("Span tag with data-aut-id='itemPrice' not found");
      }
    });
  } catch (error: any) {
    console.error(`error: ${error.message}`);
  }
}
