import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CreateWalletTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mode: schema.string({ trim: true, escape: true }, [rules.required()]),
    type: schema.string({ trim: true, escape: true }, [rules.required()]),
    currency: schema.string({ trim: true, escape: true }, [rules.required()]),
    requestedAmount: schema.number([rules.required()]),
  })

  public messages = {
    'mode.required': 'REQUIRED',
    'type.required': 'REQUIRED',
    'currency.required': 'REQUIRED',
    'requestedAmount.required': 'REQUIRED',
  }
}
