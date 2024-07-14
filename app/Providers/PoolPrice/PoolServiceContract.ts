export interface PoolServiceContract {
    getPoolAddress(tokenSymbol: string): Promise<{poolAddress: string, tokenDecimal: number}>
    getPoolPrice(amount: number, poolAddress: string, tokenDecimal: number): Promise<number>
}