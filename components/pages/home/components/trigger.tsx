import React from 'react';
import { Image, Text, View } from 'react-native';

import { TokenType } from '~/config';
import { tokenIcons } from '~/config/images';
import { formatBalance } from '~/utils/formatBalance';

export function Trigger({ token }: { token: TokenType }) {
  return (
    <View className="mx-auto mb-2 h-[75px] w-[95%] flex-row items-center justify-between rounded-xl border-2 bg-white p-3">
      <View className="flex-row items-center gap-2">
        <Image
          source={tokenIcons[token.coin.toLowerCase() as keyof typeof tokenIcons]}
          className="h-11 w-11"
        />
        <View className="border border-white">
          <Text className="text-xl" style={{ fontFamily: 'Lexend_700Bold' }}>
            {token.name}
          </Text>
          <Text className="text-gray-500" style={{ fontFamily: 'GaeilgeKids' }}>
            {formatBalance(token.balance, 2)} {token.coin}
          </Text>
        </View>
      </View>
      <View className="flex items-end justify-center border border-white">
        <Text className=" text-right text-2xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
          {formatBalance(Number(token.balance) * Number(token.rate), 2)} $US
        </Text>
        <Text className="border border-white text-gray-500" style={{ fontFamily: 'GaeilgeKids' }}>
          + {formatBalance(28, 2)} %
        </Text>
      </View>
    </View>
  );
}
