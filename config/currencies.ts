/* eslint-disable prettier/prettier */
import { PoolService } from 'App/Providers/PoolPrice/PoolService'; 
import InvalidCurrencyException from 'App/Exceptions/InvalidCurrencyException';
const {
  CURRENCY_CONVERTER_API_URL,
  CURRENCY_CONVERTER_API_USD,
  CURRENCY_CONVERTER_API_CNY,
  CURRENCY_CONVERTER_API_EUR,
  CURRENCY_CONVERTER_API_HKD,
  CURRENCY_CONVERTER_API_CAD,
} = process.env;

const supported = ['USD', 'EUR', 'HKD', 'CNY', 'CAD'];
const supportedCrypto = ['ALGO', 'BTC', 'ETH'];

const poolService = new PoolService(); // Create an instance of PoolService

export const currencies = {
  supported,
  supportedCrypto,

  url: async (base: string) => {
    if (supported.includes(base)) {
      return `${CURRENCY_CONVERTER_API_URL}/latest?apikey=${currencies.keys[base]}&base_currency=${base}`
    } else {
      throw new InvalidCurrencyException(`${base} is not supported`);
    }
  },

  cryptoUrl: async (base: string) => {
    if (supportedCrypto.includes(base)) {
      try {
        // Use PoolService to get the pool address for crypto
        const { poolAddress, tokenDecimal } = await poolService.getPoolAddress(base);

        // Use PoolService to calculate the pool price
        const poolPrice = await poolService.getPoolPrice(1, poolAddress, tokenDecimal);

        return poolPrice; // Replace YourNewURLHere with the URL you want to construct using the poolPrice
      } catch (error) {
        throw new InvalidCurrencyException(`${base} is not supported`);
      }
    } else {
      throw new InvalidCurrencyException(`${base} is not supported`);
    }
  },

  keys: {
    USD: CURRENCY_CONVERTER_API_USD,
    CNY: CURRENCY_CONVERTER_API_CNY,
    EUR: CURRENCY_CONVERTER_API_EUR,
    HKD: CURRENCY_CONVERTER_API_HKD,
    CAD: CURRENCY_CONVERTER_API_CAD,
  },
};
