import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new InvalidCurrencyException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class InvalidCurrencyException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(400).send({
      status: 400,
      code: 'E_INVALID_CURRENCY_BASE',
      message: error.message,
    })
  }
}
