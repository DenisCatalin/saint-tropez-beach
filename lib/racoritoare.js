import racoritoare from "../data/racoritoare.json";

export const getRacoritoare = () => {
  return racoritoare.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};
