import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { WalletTransactionMode, WalletTransactionStatus, WalletTransactionType } from 'libs/enums'
import { DateTime } from 'luxon'

export default class WalletTransaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public companyId: number | null

  @column()
  public currency: string

  @column()
  public fxRate: string

  @column()
  public fxFee: string

  @column()
  public fxFeePercent: string

  @column()
  public processingFee: string

  @column()
  public processingFeePercent: string

  @column()
  public requestedAmount: string

  @column()
  public chargeableAmount: string

  @column()
  public creditableAmount: string

  @column()
  public referenceId: string

  @column()
  public stripeRefId: string

  @column()
  public blockchainId: string

  @column()
  public comments: string | null

  @column()
  public uniqueId: string | null

  @column()
  public mode: WalletTransactionMode

  @column()
  public type: WalletTransactionType

  @column()
  public status: WalletTransactionStatus

  @column()
  public uniqueCode: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
