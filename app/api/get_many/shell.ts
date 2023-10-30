const util = require("util");
const exec = util.promisify(require("child_process").exec);
import fs from "fs";

const command =
  'curl -o list.txt "https://www.olx.co.id/depok-kota_g4000024/disewakan-rumah-apartemen_c5160?filter=price_between_1700000_to_2000000,type_eq_rumah"';

export async function getManyHouses() {
  try {
    const { stdout, stderr } = await exec(command);
    console.error(`stderr: ${stderr}`);

    fs.readFile("list.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      const pattern = /<[^>]+data-aut-id="itemBox"[^>]*>.*?<\/[^>]+>/g;

      const matches = data.match(pattern);

      if (matches) {
        for (let i = 0; i < matches.length - 19; i++) {
          const hrefPattern = /href="([^"]+)"/;
          const match = matches[i].match(hrefPattern);

          if (match) {
            const hrefContent = match[1];
            const fullLink = `https://www.olx.co.id${hrefContent}`;
            getHouseDetail(fullLink);
          } else {
            console.error("href attribute not found");
          }
        }
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

      var pattern = /apollo-singapore(.*?)"[^"]+/;

      var match = data.match(pattern);

      if (match) {
        var extractedText = match[1];
        console.log(extractedText);
      } else {
        console.error("No match found.");
      }
    });
  } catch (error: any) {
    console.error(`error: ${error.message}`);
  }
}
