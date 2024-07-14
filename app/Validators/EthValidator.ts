// app/Validators/EthValidator.ts
import { validator, schema } from '@ioc:Adonis/Core/Validator';
import { TransactionService } from 'App/Providers/Transaction/TransactionServices';
import { ethers } from 'ethers';

export default class EthValidator {
  public transactionService: TransactionService;

  constructor(private amountEth: string, private ethAddress: string) {
    this.transactionService = new TransactionService();
  }

  public schema = schema.create({
    amountEth: schema.string(),
    ethAddress: schema.string(),
  });

  public messages = {
    'amountEth.required': 'The amountEth field is required.',
    'ethAddress.required': 'The ethAddress field is required.',
  };

  public async validateSufficientBalance() {
    await validator.validate({
      schema: this.schema,
      messages: this.messages,
      data: {
        amountEth: this.amountEth,
        ethAddress: this.ethAddress,
      },
    });

    const senderBalanceBeforeTxn: string = await this.transactionService.getBalance(this.ethAddress);

    if (parseFloat(this.amountEth) > parseFloat(ethers.utils.formatEther(senderBalanceBeforeTxn))) {
      throw new Error('Insufficient Balance');
    }
  }
}
