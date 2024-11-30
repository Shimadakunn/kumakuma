import { Text } from 'components/ui/text';
import { View } from 'react-native';
import { formatBalance } from 'utils/formatBalance';

export default function Balance() {
  return (
    <View className="w-full flex-1 items-center justify-center py-8">
      <Text className="text-7xl" style={{ fontFamily: 'GaeilgeKids' }}>
        ${formatBalance(20.31038, 2)}
      </Text>
    </View>
  );
}
