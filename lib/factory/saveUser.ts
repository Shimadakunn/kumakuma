import { Chain, Hex, createPublicClient, createWalletClient, http, zeroAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { User } from './getUser';

import { FACTORY_ABI, FACTORY_ADDRESS, chains } from '~/config';

export async function saveUser({
  id,
  pubKey,
}: {
  id: Hex;
  pubKey: { x: Hex; y: Hex };
}): Promise<User | undefined> {
  const account = privateKeyToAccount(process.env.NEXT_PUBLIC_RELAYER_PRIVATE_KEY as Hex);

  const chainPromises = Object.entries(chains).map(async ([chainName, chainConfig]) => {
    const chain = chainConfig.viem as Chain;
    const relayerClient = createWalletClient({
      account,
      chain,
      transport: http(),
    });
    const client = createPublicClient({
      chain,
      transport: http(),
    });

    const user = await client.readContract({
      address: FACTORY_ADDRESS,
      abi: FACTORY_ABI,
      functionName: 'getUser',
      args: [BigInt(id)],
    });

    if (user.account !== zeroAddress) {
      return [chainName, undefined];
    }

    const pubKeyArray = [pubKey.x, pubKey.y] as const;
    await relayerClient.writeContract({
      address: FACTORY_ADDRESS,
      abi: FACTORY_ABI,
      functionName: 'saveUser',
      args: [BigInt(id), pubKeyArray],
    });

    const smartWalletAddress = await client.readContract({
      address: FACTORY_ADDRESS,
      abi: FACTORY_ABI,
      functionName: 'getAddress',
      args: [pubKeyArray],
    });

    const createdUser = {
      id,
      account: smartWalletAddress,
      pubKey,
    };

    return [chainName, createdUser];
  });

  const results = await Promise.all(chainPromises);
  const undefinedUser = results.find(([, user]) => user === undefined);

  if (undefinedUser) {
    return undefined;
  }

  const firstUser = results.find(([, user]) => user !== undefined);

  if (firstUser) {
    const [, createdUser] = firstUser;
    return createdUser as User;
  }
}
