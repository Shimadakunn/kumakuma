import { Text } from 'components/ui/text';
import { View } from 'react-native';

export default function Vault() {
  return (
    <View className="h-[15vh] w-full flex-row items-center justify-between gap-3 px-10">
      <View className="flex-col items-start justify-center">
        <Text className="text-xl text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
          Generated Yield
        </Text>
        <Text className="text-4xl" style={{ fontFamily: 'GaeilgeKids' }}>
          $24,342
        </Text>
      </View>
      <View className="flex-col items-end justify-center">
        <Text className="text-xl text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
          Net APY
        </Text>
        <View className="flex-row items-center justify-start">
          <Text className="text-4xl" style={{ fontFamily: 'GaeilgeKids' }}>
            27.3%
          </Text>
        </View>
      </View>
    </View>
  );
}
