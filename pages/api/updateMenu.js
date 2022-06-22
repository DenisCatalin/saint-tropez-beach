const fs = require("fs");
import { getRacoritoare } from "../../lib/menu";

export default function handler(req, res) {
  const menu = getRacoritoare();
  const numeProdus = req ? JSON.parse(req.headers.body).numeProdus : null;
  const descriereProdus = req
    ? JSON.parse(req.headers.body).descriereProdus
    : null;
  const pretProdus = req ? JSON.parse(req.headers.body).pretProdus : null;
  const method = req ? JSON.parse(req.headers.body).method : null;
  const id = req ? JSON.parse(req.headers.body).itemID : null;
  const categ = req ? JSON.parse(req.headers.body).categorieProdus : null;
  fs.readFile(
    "./data/menu.json",
    "utf8",
    function readFileCallback(err, _data) {
      if (err) {
        console.log(err);
        res.status(500).send({ done: false });
      } else {
        const obj = {
          items: [...menu],
        };

        switch (method) {
          case "update": {
            menu.map((item, i) => {
              if (i === id) {
                item.numeProdus = numeProdus;
                item.pretProdus = pretProdus;
                item.descriereProdus = descriereProdus;
                item.categorieProdus = categ;
              }
            });
            break;
          }
          case "add": {
            obj.items.push({
              numeProdus: numeProdus,
              descriereProdus: descriereProdus,
              pretProdus: pretProdus,
              categorieProdus: categ,
            });
            break;
          }
          case "delete": {
            const findProd = menu.findIndex((item, i) => {
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
          "./data/menu.json",
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
              console.log(fs.readFileSync("./data/menu.json", "utf8"));
            }
          }
        );
        res.status(200).send({ done: true });
      }
    }
  );
}
