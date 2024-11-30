import { X } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '~/components/ui/text';

interface NumPadProps {
  handleNumberPress: (value: string) => void;
  className?: string;
}

const NumPad = ({ handleNumberPress, className }: NumPadProps) => {
  return (
    <View className={`flex w-full flex-col gap-2 ${className}`}>
      {/* Row 1: 1-2-3 */}
      <View className="flex flex-row gap-2">
        {[1, 2, 3].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handleNumberPress(num.toString())}
            className="flex h-16 flex-1 items-center justify-center rounded-lg">
            <Text className="text-5xl " style={{ fontFamily: 'GaeilgeKids' }}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Row 2: 4-5-6 */}
      <View className="flex flex-row gap-2">
        {[4, 5, 6].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handleNumberPress(num.toString())}
            className="flex h-16 flex-1 items-center justify-center rounded-lg">
            <Text className="text-5xl" style={{ fontFamily: 'GaeilgeKids' }}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Row 3: 7-8-9 */}
      <View className="flex flex-row gap-2">
        {[7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handleNumberPress(num.toString())}
            className="flex h-16 flex-1 items-center justify-center rounded-lg">
            <Text className="text-5xl" style={{ fontFamily: 'GaeilgeKids' }}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Row 4: .-0-delete */}
      <View className="flex flex-row gap-2">
        <TouchableOpacity
          onPress={() => handleNumberPress('.')}
          className="flex h-16 flex-1 items-center justify-start rounded-lg ">
          <Text className="text-5xl" style={{ fontFamily: 'GaeilgeKids' }}>
            .
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress('0')}
          className="flex h-16 flex-1 items-center justify-center rounded-lg">
          <Text className="text-5xl" style={{ fontFamily: 'GaeilgeKids' }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress('delete')}
          className="flex h-16 flex-1 items-center justify-center rounded-lg">
          <X size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { NumPad };
