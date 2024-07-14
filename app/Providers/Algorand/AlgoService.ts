import algosdk, { Algodv2 } from 'algosdk';
import { AlgoServiceContract } from './AlgoServiceContract';

export class AlgoService implements AlgoServiceContract {
    public async generatePrivateKey(): Promise<Uint8Array> {
        const mnemonic: string = `${process.env.MNEMONIC}`;
        const account: algosdk.Account = algosdk.mnemonicToSecretKey(mnemonic);
    
        const privateKey: Uint8Array = account.sk; 
    
        return privateKey;
    }
    
    
    public async sendUsde(amountAlgo: number, algoReceivingAddress: string): Promise<void> {
        const token: string = '';
        const server: string = 'https://testnet-api.algonode.cloud';
        const port: number = 443;
        const client: Algodv2 = new algosdk.Algodv2(token, server, port);
        const privateKey: Promise<Uint8Array> = this.generatePrivateKey();
        const amount: number = amountAlgo;
        const algoReceivingAddr: string = algoReceivingAddress;
    
        console.log(amount, algoReceivingAddr);
        const suggestedParams: algosdk.SuggestedParams = await client.getTransactionParams().do();
        const ptxn: algosdk.Transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: `${process.env.ALGO_EVI_ADDR}`,
            suggestedParams,
            to: algoReceivingAddr,
            amount: amountAlgo,
        });
    
        // deducting 1.5% platform fee
        const platformFee: number = 0.015;
        const platformFeeMicroAlgos: number = Math.ceil(amountAlgo * platformFee);
        console.log('platformFeeMicroAlgos', platformFeeMicroAlgos);
        ptxn.amount = BigInt(ptxn.amount) - BigInt(platformFeeMicroAlgos);
        console.log('Amount after deducting platform fee', ptxn.amount);
    
        const signedTxn: Uint8Array = ptxn.signTxn(await privateKey);
    
        const { txId }: { txId: string } = await client.sendRawTransaction(signedTxn).do();
        console.log('Transaction ID:', txId);
        const result: any = await algosdk.waitForConfirmation(client, txId, 4);
        console.log(`Result:  ${result}`)
        console.log('Algo sent successfully');
        // res.status(200).json({
        //     status: 'success',
        //     message: 'Algo sent successfully',
        //     data: {
        //         txnHash: txId,
        //     },
        // });
    }
}



