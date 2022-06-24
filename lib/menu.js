import racoritoare from "../data/racoritoare.json";
import bere from "../data/bere.json";
import cafea from "../data/cafea.json";

export const getRacoritoare = () => {
  return racoritoare.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};

export const getBere = () => {
  return bere.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};

export const getCafea = () => {
  return cafea.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};
