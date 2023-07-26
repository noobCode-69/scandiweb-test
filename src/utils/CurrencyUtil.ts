import { Currency } from "../types/currency";
const exchangeRates: { [key in Currency]: number } = {
  "€": 0.91,
  $: 1,
  "₹": 81.85,
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
