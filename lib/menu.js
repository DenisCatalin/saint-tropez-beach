import racoritoare from "../data/menu.json";

export const getRacoritoare = () => {
  return racoritoare.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
      categorieProdus: item?.categorieProdus,
    };
  });
};

export const getCategories = () => {
  return racoritoare.items.map((item) => {
    return {
      categorieProdus: item?.categorieProdus,
    };
  });
};
