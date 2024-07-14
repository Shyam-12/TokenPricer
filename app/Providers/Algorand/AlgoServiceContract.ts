export interface AlgoServiceContract {
    generatePrivateKey(): Promise<Uint8Array>
    sendUsde(amountAlgo: number, algoReceivingAddress: string): Promise<void>
}