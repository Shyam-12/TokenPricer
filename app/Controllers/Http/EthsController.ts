/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ethers } from 'ethers';
import algosdk from 'algosdk';

// models
import Transaction from 'App/Models/Transaction';

// import EthValidator from 'App/Validators/EthValidator';
// import { AlgoValidator } from 'App/Validators/AlgoValidator';
// validators
import CreateWalletTransactionValidator from 'App/Validators/createWalletTransactionValidator';

import { TransactionService } from 'App/Providers/Transaction/TransactionServices'
import { PoolService } from 'App/Providers/PoolPrice/PoolService';
import { AlgoService } from 'App/Providers/Algorand/AlgoService';
import { WalletTransactionService } from 'App/Providers/WalletTransaction/WalletTransactionService';
import { WalletTransactionMode, WalletTransactionType, WalletTransactionStatus } from 'libs/enums';

export default class EthsController {
    public transactionService: TransactionService;
    public poolService: PoolService;
    public algoService: AlgoService;
    public walletTransactionService: WalletTransactionService;

    constructor() {
        this.transactionService = new TransactionService();
        this.poolService = new PoolService();
        this.algoService = new AlgoService();
        this.walletTransactionService = new WalletTransactionService();
    }
    
    public async sendEth({request, response}: HttpContextContract) {
        try {
            const { mode, currency, type, requestedAmount } = await request.validate(
                CreateWalletTransactionValidator
            )
            
            console.log("Just for checking: ", mode, currency, type, requestedAmount);

            const {
                chargeableAmount,
                processingFee,
                processingFeePercent,
                creditableAmount,
                fxFee,
                fxFeePercent,
                fxRate,
              } = await this.walletTransactionService.getWalletTransactionMeta({ mode, type, currency, requestedAmount })

              const unique_id: Promise<string> = this.transactionService.generateUniqueId();  

              const walletTransaction = await Transaction.create({
                userId: 1,
                companyId: 1001,
                mode: mode as WalletTransactionMode,
                type: type as WalletTransactionType,
                currency,
                fxRate: fxRate.toString(),
                fxFee: fxFee.toFixed(2),
                fxFeePercent,
                processingFeePercent,
                processingFee: processingFee.toFixed(2),
                requestedAmount: requestedAmount.toFixed(2),
                chargeableAmount,
                creditableAmount,
                comments: null,
                uniqueId: await unique_id,
                status: WalletTransactionStatus.PENDING,
            })

            console.log(walletTransaction.toJSON());

            // carrying the transaction
            this.transactionService.logTransactionDetails(requestedAmount.toString(), await unique_id);
      
            const wallet: Promise<ethers.Wallet> = this.transactionService.setupWallet();
            const data: Promise<string> = this.transactionService.encodeData(await unique_id, currency);
            const { gasPrice, gasLimit } = await this.transactionService.estimateTransaction(await wallet, `${process.env.TO}`, requestedAmount.toString(), await data);
      
            this.transactionService.logGasDetails(gasPrice, gasLimit, await data);
      
            const txn = await this.transactionService.executeTransaction(await wallet, `${process.env.TO}`, requestedAmount.toString(), await data, gasPrice, gasLimit);
            const txnInfo: ethers.providers.TransactionReceipt = await txn.wait();

            await this.checkTxnEtherscan(txnInfo.transactionHash);
      
            response.json({ txnInfo });
          } catch (error) {
            console.error('Error sending Ether:', error);
            response.status(500).json({ error: 'Internal Server Error' });
          }
    }

    public async checkTxnEtherscan(txnHash: string): Promise<void> {
        try {
            const { uniqueId, amountEth, algoReceivingAddr, currencyType } = await this.transactionService.fetchTransactionDetails(txnHash);
            console.log("Unique id inside checkTxnEtherscan: ", uniqueId);
            await this.fetchPoolPrice(amountEth, algoReceivingAddr, currencyType);
        } catch (error) {
            console.error("Error fetching transaction details from Etherscan: ", error.message);
        }
    }

    public async fetchPoolPrice(amountEth: string, algoReceivingAddr: string, currencyType: string): Promise<void> {
        const amount: string = amountEth;
        // Fetch pool price
        console.log("Amount: ", amount);
        
        const { poolAddress, tokenDecimal } = await this.poolService.getPoolAddress(currencyType);
        console.log('Pool Address: ', poolAddress);
        console.log('Token Decimal: ', tokenDecimal);
        const poolPrice: string = String(await (this.poolService.getPoolPrice)(Number(amount), poolAddress, tokenDecimal));
        console.log("Pool Price: ", poolPrice);
    
        try {
            const poolPriceNumber: number = parseFloat(poolPrice);
            const USDEtoSend: number = algosdk.algosToMicroalgos(poolPriceNumber);
    
            console.log("USDE to Send: ", USDEtoSend);
    
            await this.algoService.sendUsde(USDEtoSend, algoReceivingAddr);
            // response.json({ USDEtoSend: USDEtoSend });
        } catch (error) {
            console.error('Error fetching pool price:', error);
            // res.status(500).json({ error: 'Error fetching pool price' });
        }
    };
}
