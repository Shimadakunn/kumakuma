'use client';

import React, { useContext } from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { chains } from '~/config';
import { useSmartWalletHook } from '~/lib/smart-wallet/hook/useSmartWalletHook';

type UseSmartWallet = ReturnType<typeof useSmartWalletHook>;

const SmartWalletContext = React.createContext<UseSmartWallet | null>(null);
export const useWalletConnect = (): UseSmartWallet => {
  const context = useContext(SmartWalletContext);
  if (!context) {
    throw new Error('useSmartWalletHook must be used within a SmartWalletProvider');
  }
  return context;
};

export function SmartWalletProvider({ children }: { children: React.ReactNode }) {
  const smartWalletValue = useSmartWalletHook();

  const { publicClient } = configureChains([chains.arbitrum.viem], [publicProvider()]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <SmartWalletContext.Provider value={smartWalletValue}>{children}</SmartWalletContext.Provider>
    </WagmiConfig>
  );
}
