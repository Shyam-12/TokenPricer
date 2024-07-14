/* eslint-disable prettier/prettier */
import { WalletTransactionServiceContract } from 'App/Providers/WalletTransaction/WalletTransactionServiceContract'
import { HomeService } from '../Home/HomeService'
import { fees } from 'Config/fees'
import { currencies } from 'Config/currencies'

export class WalletTransactionService implements WalletTransactionServiceContract {
  public walletTransactionService: WalletTransactionServiceContract
  public homeService: HomeService
  constructor() {
    this.walletTransactionService = new WalletTransactionService()
    this.homeService = new HomeService()
  }

  public async getChargeableAmount(
    mode: string,
    currency: string,
    type: string,
    requestedAmount: number
  ) {
    try {
      const charges = fees[currency][type]['fee']

      const chargeableAmount = (requestedAmount + (requestedAmount * charges) / 100).toFixed(
        currencies.supportedCrypto.includes(currency) ? 3 : 2
      )

      return {
        chargeableAmount: mode === 'withdraw' ? requestedAmount.toFixed(2) : chargeableAmount,
        processingFee: mode === 'withdraw' ? 0 : (requestedAmount * charges) / 100,
        processingFeePercent: mode === 'withdraw' ? 0 : charges,
      }
    } catch (error) {
      throw error
    }
  }

  public async getCreditableAmount(
    mode: string,
    currency: string,
    type: string,
    requestedAmount: number,
    fxRate: number
  ) {
    try {
      const charges = fees[currency][type]['fx']

      const amountAfterCurrencyConversion = requestedAmount * fxRate

      const creditableAmount =
        amountAfterCurrencyConversion - (amountAfterCurrencyConversion * charges) / 100

      return {
        creditableAmount:
          mode === 'withdraw' ? (requestedAmount / fxRate).toFixed(2) : creditableAmount.toFixed(2),
        fxFee: mode === 'withdraw' ? 0 : (amountAfterCurrencyConversion * charges) / 100,
        fxFeePercent: mode === 'withdraw' ? 0 : charges,
      }
    } catch (error) {
      throw error
    }
  }

  public async getWalletTransactionMeta({ mode, currency, type, requestedAmount }) {
    const conversableCurrency = 'USD'

    const conversations = await this.homeService.getCurrency(currency)

    const conversableCurrencyValue = conversations.meta
      ? conversations.meta[conversableCurrency].value
      : 0

    const fxRate = conversableCurrency === currency ? 1 : conversableCurrencyValue

    const { chargeableAmount, processingFee, processingFeePercent } =
      await this.walletTransactionService.getChargeableAmount(mode, currency, type, requestedAmount)

    const { creditableAmount, fxFee, fxFeePercent } =
      await this.walletTransactionService.getCreditableAmount(
        mode,
        currency,
        type,
        requestedAmount,
        fxRate
      )

    return {
      chargeableAmount,
      processingFee,
      processingFeePercent,
      creditableAmount,
      fxFee,
      fxFeePercent,
      fxRate,
    }
  }
}
