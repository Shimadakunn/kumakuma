import axios from 'axios';
import { createPublicClient, formatUnits, Hex, http } from 'viem';

import { chains, ERC20_ABI, tokens } from '~/config';

const API_BASE_URL = `https://min-api.cryptocompare.com`;

export const fetch = async () => {
  const client = createPublicClient({
    chain: chains.arbitrum.viem,
    transport: http(),
  });

  const [price, balance, stakedBalance] = await Promise.all([
    axios.get(
      `${API_BASE_URL}/data/price?fsym=${tokens.usdc.coin}&tsyms=USD&api_key=${process.env.NEXT_PUBLIC_PRICE_API_KEY}`
    ),
    client.readContract({
      address: tokens.usdc.address as Hex,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: ['0x1f29312f134C79984bA4b21840f2C3DcF57b9c85'],
    }),
    client.readContract({
      address: tokens.usdc.stakedTokenAddress as Hex,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: ['0x1f29312f134C79984bA4b21840f2C3DcF57b9c85'],
    }),
  ]);

  tokens.usdc.rate = price.data.USD;
  tokens.usdc.balance = formatUnits(balance as bigint, 6);
  tokens.usdc.stakedBalance = formatUnits(stakedBalance as bigint, 6);

  console.log(tokens.usdc);
};
