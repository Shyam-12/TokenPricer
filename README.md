# TokenPricer
I used Uniswap V3 API to take an input balance of any cryptocurrency and tell its real-time price in terms of an ERC-20 token, it can be modified even to tell the price of any other token like USDC or USDT etc.

The project is built using Adonis.js and Typescript. 

You can have a look at the code inside App Folder, in the providers and controller files. The PoolService.ts file contains the logic of utilizing Uniswap V3 API to fetch the real-time price of the cryptocurrencies.
