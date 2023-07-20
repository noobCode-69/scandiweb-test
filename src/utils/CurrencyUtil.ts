import { Currency } from "../types/currency";
const exchangeRates: { [key in Currency]: number } = {
  "€": 0.85,
  $: 1,
  "₹": 74.47,
};

export const convertCurrency = (
  baseCurrency: Currency,
  basePrice: number,
  currencyToConvert: Currency
): number => {
  if (baseCurrency === currencyToConvert) {
    return basePrice;
  }
  const convertedPrice =
    (basePrice / exchangeRates[baseCurrency]) *
    exchangeRates[currencyToConvert];
  return convertedPrice;
};
