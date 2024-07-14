import Currency from 'App/Models/Currency'
import { HomeServiceContract } from 'App/Providers/Home/HomeServiceContract'
import axios from 'axios'
import { currencies } from 'Config/currencies'
import { DateTime } from 'luxon'
export class HomeService implements HomeServiceContract {
  public async getCurrency(base: string) {
    try {
      let currency = await Currency.firstOrCreate({ base }, { base })

      const now = DateTime.now()

      const lastUpdated = now.diff(currency.updatedAt, 'seconds').get('seconds')

      let meta = {}
      if (!currency.meta || lastUpdated > 60 * 10 || currencies.supportedCrypto.includes(base)) {
        if (currencies.supportedCrypto.includes(base)) {
          const poolPrice = currencies.cryptoUrl(base)

          meta = {
            USD: {
              code: 'USD',
              value: poolPrice,
            },
          }
        } else {
          const url: Promise<String> = currencies.url(base)

          const { data } = await axios.get((await url).toString())

          meta = Object.keys(data.data)
            .filter((currency) => currencies.supported.includes(currency))
            .reduce((previous, current) => {
              return { ...previous, [current]: data.data[current] }
            }, {})
        }

        currency.meta = JSON.stringify(meta)

        currency.updatedAt = now

        await currency.save()
      }
      return await currency.refresh()
    } catch (e) {
      throw e
    }
  }

  public async getCurrencyRates() {
    try {
      const currencyRate = (await Currency.query().where('base', 'ALGO').first()) as Currency

      return currencyRate
    } catch (e) {
      throw e
    }
  }
}
