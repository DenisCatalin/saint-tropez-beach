const fs = require("fs");
import { getRacoritoare } from "../../lib/racoritoare";

export default function handler(req, res) {
  const racoritoare = getRacoritoare();

  const file = req ? JSON.parse(req.headers.body).file : null;
  const numeProdus = req ? JSON.parse(req.headers.body).numeProdus : null;
  const descriereProdus = req
    ? JSON.parse(req.headers.body).descriereProdus
    : null;
  const pretProdus = req ? JSON.parse(req.headers.body).pretProdus : null;
  const method = req ? JSON.parse(req.headers.body).method : null;
  const id = req ? JSON.parse(req.headers.body).itemID : null;
  fs.readFile(
    `./data/${file}.json`,
    "utf8",
    function readFileCallback(err, _data) {
      if (err) {
        console.log(err);
        res.status(500).send({ done: false });
      } else {
        const obj = {
          items: [...racoritoare],
        };

        switch (method) {
          case "update": {
            console.log("CE PLM AM PRIMIT: ", numeProdus);
            racoritoare.map((item, i) => {
              if (i === id) {
                console.log(
                  "asta e",
                  item.numeProdus,
                  item.pretProdus,
                  item.descriereProdus
                );
                item.numeProdus = numeProdus;
                item.pretProdus = pretProdus;
                item.descriereProdus = descriereProdus;
              }
            });
            break;
          }
          case "add": {
            obj.items.push({
              numeProdus: numeProdus,
              descriereProdus: descriereProdus,
              pretProdus: pretProdus,
            });
            break;
          }
          case "delete": {
            const findProd = racoritoare.findIndex((item, i) => {
              if (item.numeProdus === numeProdus) {
                if (i === 0) {
                  obj.items.shift();
                } else return i;
              }
            });
            if (findProd !== -1) {
              obj.items.splice(findProd, 1);
            }
            break;
          }
          default: {
            break;
          }
        }

        const json = JSON.stringify(obj);
        fs.writeFile(
          `./data/${file}.json`,
          json,
          {
            encoding: "utf8",
            flag: "w",
            mode: 0o666,
          },
          (err) => {
            if (err) console.log(err);
            else {
              console.log("File written successfully\n");
              console.log("The written has the following contents:");
              console.log(fs.readFileSync(`./data/${file}.json`, "utf8"));
            }
          }
        );
        res.status(200).send({ done: true });
      }
    }
  );
}
