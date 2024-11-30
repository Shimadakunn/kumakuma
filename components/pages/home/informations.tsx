import { Coins, HandCoins, Info, Link } from 'lucide-react-native';
import { Image, View } from 'react-native';

import { Separator, Text } from '~/components/ui';
import { tokenIcons } from '~/config';

export function Informations() {
  return (
    <View className="flex w-full flex-col px-6 py-2">
      <Separator />
      <Text className="mt-4 text-sm text-gray-400" style={{ fontFamily: 'Lexend_700Bold' }}>
        Informations
      </Text>

      <View className="flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-1">
          <Coins size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
            Protocol
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>
        <Text className=" font-black" style={{ fontFamily: 'Lexend_700Bold' }}>
          Morpho Labs
        </Text>
      </View>
      <View className="flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-1">
          <HandCoins size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
            Total Supply
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>
        <Text className="font-black" style={{ fontFamily: 'Lexend_700Bold' }}>
          $24,63M
        </Text>
      </View>
      <View className="flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-1">
          <HandCoins size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
            Yield Generated
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>
        <Text className="font-black" style={{ fontFamily: 'Lexend_700Bold' }}>
          $23
        </Text>
      </View>
      <View className="flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-1">
          <HandCoins size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
            Liquidity
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>
        <Text className="font-black" style={{ fontFamily: 'Lexend_700Bold' }}>
          $6,48M
        </Text>
      </View>
      <View className="flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-1">
          <HandCoins size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
            Token
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>
        <View className="flex flex-row items-center justify-center gap-1">
          <Text className="font-black" style={{ fontFamily: 'Lexend_700Bold' }}>
            USDC
          </Text>
          <Image source={tokenIcons.usdc} className="h-5 w-5" />
        </View>
      </View>
      <View className="flex w-full flex-row items-center justify-between ">
        <View className="flex flex-row items-center justify-center gap-1">
          <Link size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm" style={{ fontFamily: 'Lexend_700Bold' }}>
            Chain
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>
        <Image source={tokenIcons.usdc} className="h-5 w-5" />
      </View>
    </View>
  );
}
