import { ethers } from "ethers"
export interface TransactionServiceContract {
    getBalance(address: string): Promise<string>
    logTransactionDetails(amountEth: string, algoReceivingAddr: string, unique_id: string): void
    setupWallet(): Promise<ethers.Wallet>
    generateUniqueId(): Promise<string>
    encodeData(unique_id: string, algoReceivingAddr: string, currencyType: string): Promise<string>
    estimateTransaction(wallet: ethers.Wallet, to: string, amountEth: string, data: string): Promise<{ gasPrice: ethers.BigNumber, gasLimit: ethers.BigNumber }>
    logGasDetails(gasPrice: ethers.BigNumber, gasLimit: ethers.BigNumber, data: string): void
    executeTransaction(wallet: ethers.Wallet, to: string, amountEth: string, data: string, gasPrice: ethers.BigNumber, gasLimit: ethers.BigNumber): Promise<ethers.providers.TransactionResponse>
    fetchTransactionDetails(txnHash: string): Promise<{uniqueId: string, amountEth: string, algoReceivingAddr: string, currencyType: string}>
}