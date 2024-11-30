import axios from 'axios';
import { Hash } from 'viem';

import { SmartWalletClient } from '../smart-wallet';

export type GetUserOperationReceiptReturnType = Hash;

export async function getUserOperationReceipt(
  client: SmartWalletClient,
  args: { hash: Hash }
): Promise<any> {
  try {
    const response = await axios.post(client.transport.url, {
      jsonrpc: '2.0',
      method: 'eth_getUserOperationReceipt',
      params: [args.hash],
      id: 1,
    });
    console.log('waiting receipt', response);

    return response.data.result;
  } catch (error) {
    console.error('Error fetching getUserOperationReceipt:', error);
    throw error;
  }
}
