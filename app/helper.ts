export function convertCurrencyStringToNumber(currencyString: string) {
  // Remove non-numeric characters (e.g., currency symbol and commas)
  const numericString = currencyString.replace(/[^\d]/g, "");

  // Parse the numeric string as a float (for decimal numbers) or an integer (for whole numbers)
  const number = parseFloat(numericString);

  return number;
}
