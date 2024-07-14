import { ethers } from 'ethers';
import JSBI from 'jsbi';
import { TickMath, FullMath } from '@uniswap/v3-sdk';
import { PoolServiceContract } from './PoolServiceContract';

interface TokenInfo {
    [key: string]: {
        address: string;
        decimals: number;
    };
}

const tokenInfo: TokenInfo = {
    'ETH': { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', decimals: 18 },
    'BTC': { address: '0xYOUR_BITCOIN_ADDRESS', decimals: 8 },
    'USDC': { address: '0xYOUR_USDC_ADDRESS', decimals: 6 },
    'DOGE': { address: '0x4206931337dc273a630d328da6441786bfad668f', decimals: 8 },
    'UNI': { address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', decimals: 18 },
    'AAVE': { address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9', decimals: 18 },
};

export class PoolService implements PoolServiceContract {
    public async getPoolAddress(tokenSymbol: string): Promise<{poolAddress: string, tokenDecimal: number}> {
        console.log("TOken symbol inside PoolAddress Function: ", tokenSymbol);
    
        const factoryAddress: string = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
        const quoteTokenAddress: string = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
        const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL_MAINNET);
    
        try {
            console.log('Token Symbol: ', tokenSymbol);
            const tokenAddress: string = tokenInfo[tokenSymbol]?.address || tokenInfo['eth'].address;
            const tokenDecimal: number = tokenInfo[tokenSymbol]?.decimals || tokenInfo['eth'].decimals;
            if (!tokenAddress) {
                throw new Error('Token not found in the list');
            }
    
            const factoryContract: ethers.Contract = new ethers.Contract(factoryAddress, [
                'function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)',
            ], provider);
    
            const poolAddress: string = await factoryContract.getPool(tokenAddress, quoteTokenAddress, 3000);
            console.log(`Pool Address for ${tokenSymbol.toUpperCase()}-USDT:`, poolAddress);
            return { poolAddress, tokenDecimal };
        } catch (error: any) {
            console.error('Error fetching pool address:', error.message);
            throw error;
        }
    }
    
    public async getPoolPrice(amount: number, poolAddress: string, tokenDecimal: number): Promise<number> {
    //   const { poolAddress, tokenDecimal } = await getPoolAddress(currencyType);
      const currencyAmount: number = amount;
      const tokenDec: number = tokenDecimal;
      const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL_MAINNET);
    
      const poolContract: ethers.Contract = new ethers.Contract(
        poolAddress,
        ['function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext)'],
        provider
      );
    
      async function getCurrentTick(): Promise<number> {
        const { tick }: { tick: number } = await poolContract.slot0();
        return tick;
      }
    
      getCurrentTick().then((currentTick: number) => {
        console.log('Current Tick:', currentTick);
      });
    
      async function getQuoteAmount(inputAmount: number, currentTick: number, baseTokenDecimals: number, quoteTokenDecimals: number): Promise<number> {
        const sqrtRatioX96: JSBI = TickMath.getSqrtRatioAtTick(currentTick);
        const ratioX192: JSBI = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);
    
        const baseAmount: JSBI = JSBI.BigInt(inputAmount * (10 ** baseTokenDecimals));
        const shift: JSBI = JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(192));
    
        const quoteAmount: JSBI = FullMath.mulDivRoundingUp(ratioX192, baseAmount, shift);
    
        return parseFloat(quoteAmount.toString()) / (10 ** quoteTokenDecimals);
      }
    
      // Example usage
      async function calculatePoolPrice(currencyAmount: number, tokenDecimal: number): Promise<number> {
        const currentTick: number = await getCurrentTick();
        const quoteAmount: number = await getQuoteAmount(currencyAmount, currentTick, tokenDecimal, 6);
    
        console.log('Current Tick:', currentTick);
        console.log('Quote Amount:', quoteAmount);
        return quoteAmount;
      }
    
      return calculatePoolPrice(currencyAmount, tokenDec);
    
    };
}