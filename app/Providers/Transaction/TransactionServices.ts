import { ethers } from 'ethers';
import cryptoJS from 'crypto-js';
import axios from 'axios';
import { TransactionServiceContract } from './TransactionServicesContract';

export class TransactionService implements TransactionServiceContract {
    public async getBalance(address: string): Promise<string> {
        const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API_URL);
        const balance = await provider.getBalance(address);
        return balance.toString();
    }
    
    public async logTransactionDetails(amountEth: string, unique_id: string): Promise<void> {
        console.log(`Amount of Eth being Transferred: ${amountEth} and Unique Id: ${unique_id}`);
    }
    
    public async setupWallet(): Promise<ethers.Wallet> {
        const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API_URL);
        return new ethers.Wallet(`${process.env.ETH_USER_PRIVATE_KEY}`, provider);
    }
    
    public async generateUniqueId(): Promise<string> {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000000);
        const idData = timestamp + '-' + random;
        const uniqueId = cryptoJS.SHA256(idData).toString(cryptoJS.enc.Hex);
        return uniqueId;
    }
    
    public async encodeData(unique_id: string, currencyType: string): Promise<string> {
        return ethers.utils.hexlify(
            ethers.utils.concat([
                ethers.utils.toUtf8Bytes(unique_id),
                ethers.utils.toUtf8Bytes(currencyType)
            ])
        );
    }
    
    public async estimateTransaction(wallet: ethers.Wallet, to: string, amountEth: string, data: string): Promise<{ gasPrice: ethers.BigNumber, gasLimit: ethers.BigNumber }> {
        const gasPrice: ethers.BigNumber = await wallet.getGasPrice();
        const gasLimit: ethers.BigNumber = await wallet.estimateGas({
          to: to,
          value: ethers.utils.parseEther(amountEth),
          data: data,
        });
        return { gasPrice, gasLimit };
    }
    
    public async logGasDetails(gasPrice: ethers.BigNumber, gasLimit: ethers.BigNumber, data: string): Promise<void> {
        console.log("Gas Price: ", gasPrice);
        console.log("Gas Limit: ", gasLimit);
        console.log("Data: ", data);
    }
    
    public async executeTransaction(wallet: ethers.Wallet, to: string, amountEth: string, data: string, gasPrice: ethers.BigNumber, gasLimit: ethers.BigNumber): Promise<ethers.providers.TransactionResponse> {
        return wallet.sendTransaction({
            to,
            value: ethers.utils.parseEther(amountEth),
            data,
            gasPrice,
            gasLimit,
        });
    }
    
    public async fetchTransactionDetails(txnHash: string): Promise<{uniqueId: string, amountEth: string, algoReceivingAddr: string, currencyType: string}> {
        const apiUrl = `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txnHash}&apikey=${process.env.ETHERSCAN_API_KEY}`
    
        const response = await axios.get(apiUrl);
        const transaction = response.data.result;
    
        const inputData = transaction.input;
        const decodedInputData = ethers.utils.toUtf8String(inputData);
        console.log("Decoded Input Data:", decodedInputData);
    
        const uniqueIdLength = 64;
        const uniqueId = decodedInputData.slice(0, uniqueIdLength);
        const algoReceivingAddr = decodedInputData.slice(uniqueIdLength, uniqueIdLength + 58);
        const amountEth = ethers.utils.formatEther(transaction.value);
        const currencyType = decodedInputData.slice(uniqueIdLength + 58);
    
        console.log("Decoded Unique ID:", uniqueId);
        console.log("Decoded Algo Receiving Address:", algoReceivingAddr);
        console.log("Amount of Eth being Transferred:", amountEth);
        console.log("Currency Type: ", currencyType);
    
        return { uniqueId, amountEth, algoReceivingAddr, currencyType }
    }
}