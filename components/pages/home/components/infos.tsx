import { Coins, HandCoins, Info, Link } from 'lucide-react-native';
import { Image, View } from 'react-native';

import { Text } from '~/components/ui';
import { TokenType, tokenIcons } from '~/config';

export function Infos({ token }: { token: TokenType }) {
  return (
    <View className="flex w-full flex-col px-6 py-4">
      <Text className="text-sm text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
        Informations
      </Text>
      <View className="flex w-full flex-row items-center justify-between ">
        <View className="flex flex-row items-center justify-center gap-1">
          <Coins size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
            Automatic Yield
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>
        <Text className="text-xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
          14%
        </Text>
      </View>
      <View className="flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-1">
          <HandCoins size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm " style={{ fontFamily: 'Lexend_700Bold' }}>
            Generated Yield
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>

        <Text className="text-xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
          0.12 $US
        </Text>
      </View>
      <View className="flex w-full flex-row items-center justify-between ">
        <View className="flex flex-row items-center justify-center gap-1">
          <Link size={13} color="black" strokeWidth={2.5} />
          <Text className="text-sm" style={{ fontFamily: 'Lexend_700Bold' }}>
            Chain
          </Text>
          <Info size={13} color="gray" strokeWidth={2.5} />
        </View>
        <Image source={tokenIcons[token.coin as keyof typeof tokenIcons]} className="h-6 w-6" />
      </View>
    </View>
  );
}
