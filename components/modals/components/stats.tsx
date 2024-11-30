import { Coins, HandCoins, Info, Link } from 'lucide-react-native';
import React from 'react';
import { Image, View } from 'react-native';

import { Text } from '~/components/ui';
import { tokenIcons } from '~/config';

const Supply = () => {
  return (
    <View className="flex w-full flex-row items-center justify-between ">
      <View className="flex flex-row items-center justify-center gap-1">
        <Coins size={13} color="black" strokeWidth={2.5} />
        <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
          Total Supply
        </Text>
        <Info size={13} color="gray" strokeWidth={2.5} />
      </View>
      <View className="flex flex-row items-center justify-center">
        <Text className="text-xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
          $12.34
        </Text>
        <Text className="text-xl" style={{ fontFamily: 'Lexend_700Bold' }}>
          M
        </Text>
      </View>
    </View>
  );
};

const Liquidity = () => {
  return (
    <View className="flex w-full flex-row items-center justify-between">
      <View className="flex flex-row items-center justify-center gap-1">
        <HandCoins size={13} color="black" strokeWidth={2.5} />
        <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
          Total Liquidity
        </Text>
        <Info size={13} color="gray" strokeWidth={2.5} />
      </View>

      <View className="flex flex-row items-center justify-center">
        <Text className="text-xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
          $12.34
        </Text>
        <Text className="text-xl" style={{ fontFamily: 'Lexend_700Bold' }}>
          M
        </Text>
      </View>
    </View>
  );
};

const Token = () => {
  return (
    <View className="flex w-full flex-row items-center justify-between ">
      <View className="flex flex-row items-center justify-center gap-1">
        <Link size={13} color="black" strokeWidth={2.5} />
        <Text className="text-sm" style={{ fontFamily: 'Lexend_700Bold' }}>
          Chain
        </Text>
        <Info size={13} color="gray" strokeWidth={2.5} />
      </View>
      <Image source={tokenIcons.usdc} className="h-6 w-6" />
    </View>
  );
};

const GeneratedYield = () => {
  return <View />;
};
export function Stats() {
  return (
    <View className="flex w-full flex-col px-6 py-4">
      <Text className="text-sm text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
        Vault Information
      </Text>
      <Supply />
      <Liquidity />
      <Token />
      <GeneratedYield />
    </View>
  );
}
