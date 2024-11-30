import { useEffect, useState } from 'react';
import { Hash } from 'viem';

import { smartWallet } from '../service/smart-wallet';

import { chains } from '~/config';

export function useSmartWalletHook() {
  const [address, setAddress] = useState<Hash | null>(null);

  async function init(address: Hash) {
    smartWallet.init(chains.arbitrum);
    setAddress(address);
  }

  useEffect(() => {
    if (!address) return;

    smartWallet.client.watchEvent({
      address,
      onLogs: (logs: any) => {},
    });
  }, [address]);

  return {
    address,
    init,
  };
}
