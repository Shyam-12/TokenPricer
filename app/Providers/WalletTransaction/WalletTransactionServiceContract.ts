export interface WalletTransactionServiceContract {
    getWalletTransactionMeta({ mode, currency, type, requestedAmount }): Promise<any>;
    getChargeableAmount(mode: string, currency: string, type: string, requestedAmount: number): Promise<any>;
    getCreditableAmount(mode: string, currency: string, type: string, requestedAmount: number, fxRate: number): Promise<any>;
}