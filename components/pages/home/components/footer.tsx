import { Repeat, Send } from 'lucide-react-native';
import { View } from 'react-native';

import { Button, Text } from '~/components/ui';
import { TokenType } from '~/config';

export function Footer({
  token,
  onShowExchange,
}: {
  token: TokenType;
  onShowExchange: (orderType: 'buy' | 'sell') => void;
}) {
  return (
    <View className="absolute bottom-0 left-0 right-0 w-full flex-row items-center justify-center gap-5 border-t-2 border-gray-300 bg-white py-4">
      <Button
        onPress={() => onShowExchange('sell')}
        className="h-14 w-[43vw] rounded-xl bg-background">
        <View className="flex flex-row items-center justify-start gap-2">
          <Text className="text-2xl text-white" style={{ fontFamily: 'Lexend_700Bold' }}>
            Sell
          </Text>
          <Repeat size={20} color="white" strokeWidth={3} />
        </View>
      </Button>
      <Button
        onPress={() => onShowExchange('buy')}
        className="h-14 w-[43vw] rounded-xl bg-background">
        <View className="flex flex-row items-center justify-start gap-2">
          <Text className="text-2xl text-white" style={{ fontFamily: 'Lexend_700Bold' }}>
            Buy
          </Text>
          <Send size={20} color="white" strokeWidth={3} />
        </View>
      </Button>
    </View>
  );
}
