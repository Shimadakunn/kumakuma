import React from 'react';
import { Image, Text, View } from 'react-native';

import { TokenType, tokenIcons } from '~/config';
import { formatBalance } from '~/utils/formatBalance';

export function Header({ token }: { token: TokenType }) {
  return (
    <View className="h-[16vh] w-full flex-row items-center justify-between px-6 py-4">
      <View className="flex-col items-start justify-between gap-2">
        <Image
          source={tokenIcons[token.coin.toLowerCase() as keyof typeof tokenIcons]}
          className="mt-3 h-16 w-16"
        />
        <View className="flex-1 items-end justify-end">
          <Text className="text-2xl" style={{ fontFamily: 'Lexend_700Bold' }}>
            {token.name}
          </Text>
        </View>
      </View>
      <View className="h-full flex-col items-end justify-between gap-2">
        <Text className="text-xl text-gray-800" style={{ fontFamily: 'GaeilgeKids' }}>
          {' '}
        </Text>
        <View className="flex-col items-end ">
          <Text className="text-lg text-gray-800" style={{ fontFamily: 'GaeilgeKids' }}>
            + 0%
          </Text>
          <Text className="text-4xl" style={{ fontFamily: 'GaeilgeKids' }}>
            {formatBalance(token.rate, 2)} $US
          </Text>
        </View>
      </View>
    </View>
  );
}
