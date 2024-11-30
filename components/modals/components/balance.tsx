import { Send } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '~/components/ui';
import { tokens } from '~/config';
import { formatBalance } from '~/utils/formatBalance';

export function Balance() {
  return (
    <View className="flex w-full flex-row items-center justify-between px-6 py-4">
      <View className=" ">
        <Text className="text-sm text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
          Your Balance
        </Text>
        <Text className="text-4xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
          {formatBalance(Number(tokens.usdc.balance) * Number(tokens.usdc.rate), 2)} $US
        </Text>
        <Text className="text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
          {formatBalance(tokens.usdc.balance, 2)} USDC
        </Text>
      </View>
      <View className="flex-col items-center justify-center">
        <Send size={25} color="black" strokeWidth={3} onPress={() => {}} />
      </View>
    </View>
  );
}
