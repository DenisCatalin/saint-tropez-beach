import racoritoare from "../data/racoritoare.json";
import bere from "../data/bere.json";
import cafea from "../data/cafea.json";
import cocktail from "../data/cocktail.json";
import fresh from "../data/fresh.json";
import shot from "../data/shot.json";
import vin from "../data/vin.json";
import spirits from "../data/spirits.json";
import bered from "../data/bered.json";

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

export const getCocktail = () => {
  return cocktail.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};

export const getFresh = () => {
  return fresh.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};

export const getShot = () => {
  return shot.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};

export const getVin = () => {
  return vin.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};

export const getBered = () => {
  return bered.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};

export const getSpirits = () => {
  return spirits.items.map((item) => {
    return {
      numeProdus: item?.numeProdus,
      descriereProdus: item?.descriereProdus,
      pretProdus: item?.pretProdus,
    };
  });
};
