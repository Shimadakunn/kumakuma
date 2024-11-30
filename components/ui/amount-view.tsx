import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { tokenIcons, TokenType } from '~/config';
import { formatBalance } from '~/utils';
export interface AmountViewProps {
  value: string;
  onChangeText: (text: string) => void;
  token: TokenType;
}

const AmountView = React.forwardRef<View, AmountViewProps>(
  ({ value, onChangeText, token }, ref) => {
    return (
      <View ref={ref} className="flex w-full items-start justify-between rounded-lg">
        <View className="w-full flex-row items-start justify-between px-1">
          {value ? (
            <View className="mt-2 flex-col items-start justify-between">
              <Text className="text-5xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
                {value} {token.coin}
              </Text>
              <Text
                className="px-1 text-lg font-black text-gray-500"
                style={{ fontFamily: 'GaeilgeKids' }}>
                {formatBalance(Number(value) * Number(token.rate), 2)} $US
              </Text>
            </View>
          ) : (
            <View className="mt-2 flex-col items-start justify-between ">
              <Text
                className="text-5xl font-black text-gray-400"
                style={{ fontFamily: 'GaeilgeKids' }}>
                0 {token.coin}
              </Text>
              <Text
                className=" px-1 text-end text-lg font-black text-gray-500"
                style={{ fontFamily: 'GaeilgeKids' }}>
                0 $US
              </Text>
            </View>
          )}
          <View className="flex-col items-end justify-between gap-1">
            <Image
              source={tokenIcons[token.coin.toLowerCase() as keyof typeof tokenIcons]}
              className="mr-2 h-14 w-14"
            />
            <Text
              className="px-1 text-lg font-black text-gray-700"
              style={{ fontFamily: 'GaeilgeKids' }}>
              {formatBalance(Number(token.balance), 2)} {token.coin}
            </Text>
          </View>
        </View>

        <View className="mt-2 w-full flex-row items-center justify-center gap-4 px-1">
          <TouchableOpacity
            className="flex h-10 w-16 items-center justify-center rounded-xl bg-gray-400"
            onPress={() => onChangeText((Number(token.balance) * 0.1).toString())}>
            <Text
              className="ml-1 text-xl font-black text-white"
              style={{ fontFamily: 'GaeilgeKids' }}>
              10%
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex h-10 w-16 items-center justify-center rounded-xl bg-gray-400"
            onPress={() => onChangeText((Number(token.balance) * 0.25).toString())}>
            <Text
              className="ml-1 text-xl font-black text-white"
              style={{ fontFamily: 'GaeilgeKids' }}>
              25%
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex h-10 w-16 items-center justify-center rounded-xl bg-gray-400"
            onPress={() => onChangeText((Number(token.balance) * 0.5).toString())}>
            <Text
              className="ml-1 text-xl font-black text-white"
              style={{ fontFamily: 'GaeilgeKids' }}>
              50%
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex h-10 w-16 items-center justify-center rounded-xl bg-gray-400"
            onPress={() => onChangeText((Number(token.balance) * 1).toString())}>
            <Text
              className="ml-1 text-xl font-black text-white"
              style={{ fontFamily: 'GaeilgeKids' }}>
              100%
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

AmountView.displayName = 'AmountView';

export { AmountView };
