const util = require("util");
const exec = util.promisify(require("child_process").exec);
import fs from "fs";
const command =
  'curl -o list.txt "https://www.olx.co.id/depok-kota_g4000024/disewakan-rumah-apartemen_c5160?filter=price_between_1700000_to_2000000,type_eq_rumah"';

export async function getManyHouses() {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    // await new Promise(() => {
    //   setTimeout(() => {}, 2000);
    // });

    fs.readFile("list.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      const pattern = /<[^>]+data-aut-id="itemBox"[^>]*>.*?<\/[^>]+>/g;

      const matches = data.match(pattern);

      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          const hrefPattern = /href="([^"]+)"/;
          const match = matches[i].match(hrefPattern);

          if (match) {
            const hrefContent = match[1];
            console.log(hrefContent);
          } else {
            console.log("href attribute not found");
          }
        }
      } else {
        console.log("No matching tags found in the HTML content.");
      }
    });
  } catch (error: any) {
    console.error(`error: ${error.message}`);
  }
}
