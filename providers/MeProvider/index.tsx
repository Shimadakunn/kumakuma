import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { Address, Hex, zeroAddress } from 'viem';
import { Chain } from 'viem/chains';

import { saveUser } from '~/lib/factory';
import { getUser } from '~/lib/factory/getUser';
import { WebAuthn } from '~/lib/web-authn/service/web-authn';

export type Me = {
  account: Address;
  keyId: Hex;
  pubKey: {
    x: Hex;
    y: Hex;
  };
};

function useMeHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState<Me | null>();
  const [isReturning, setIsReturning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [chain, switchChain] = useState<Chain | undefined>();

  async function disconnect() {
    await AsyncStorage.removeItem('@kuma/me');
    setMe(null);
  }

  async function create(username: string) {
    console.log('creating user', username);
    setIsLoading(true);

    try {
      console.log('WebAuthn signature...');
      const credential = await WebAuthn.create({ username });
      console.log('credential', credential);
      if (!credential) {
        return;
      }
      console.log('saving user on smart contract...');
      const user = await saveUser({
        id: credential.rawId,
        pubKey: credential.pubKey,
      });

      const me = {
        keyId: user!.id as Hex,
        pubKey: user!.pubKey,
        account: user!.account,
      };

      if (me === undefined) {
        console.log('error while saving user');
        return;
      }

      // Store user data using AsyncStorage
      await AsyncStorage.setItem('@kuma/me', JSON.stringify(me));
      await AsyncStorage.setItem('@kuma/returning', 'true');
      setIsReturning(true);
      setMe(me);
    } catch (e) {
      console.error('error while creating user', e);
    } finally {
      setIsLoading(false);
    }
  }

  async function get() {
    setIsLoading(true);
    try {
      const credential = await WebAuthn.get();
      if (!credential) {
        return;
      }
      const user = await getUser(credential.rawId);

      if (user?.account === undefined || user?.account === zeroAddress) {
        throw new Error('user not found');
      }

      const me = {
        keyId: user.id as Hex,
        pubKey: user.pubKey,
        account: user.account,
      };

      await AsyncStorage.setItem('@kuma/me', JSON.stringify(me));
      await AsyncStorage.setItem('@kuma/returning', 'true');
      setIsReturning(true);
      setMe(me);
    } catch (e) {
      await AsyncStorage.removeItem('@kuma/returning');
      await disconnect();
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadStoredData() {
      try {
        const [meString, returning] = await Promise.all([
          AsyncStorage.getItem('@kuma/me'),
          AsyncStorage.getItem('@kuma/returning'),
        ]);

        if (meString) {
          setMe(JSON.parse(meString));
        }
        if (returning === 'true') {
          setIsReturning(true);
        }
        setIsMounted(true);
      } catch (e) {
        console.log('error while loading stored data', e);
        setIsMounted(true);
      }
    }

    loadStoredData();
  }, []);

  return {
    isLoading,
    isMounted,
    me,
    returning: isReturning,
    create,
    get,
    disconnect,
    chain,
    switchChain,
  };
}

type UseMeHook = ReturnType<typeof useMeHook>;
const MeContext = createContext<UseMeHook | null>(null);

export const useMe = (): UseMeHook => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error('useMeHook must be used within a MeProvider');
  }
  return context;
};

export function MeProvider({ children }: { children: React.ReactNode }) {
  const hook = useMeHook();

  return <MeContext.Provider value={hook}>{children}</MeContext.Provider>;
}
