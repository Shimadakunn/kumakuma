import { X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '~/components/ui';

export function Footer({ setShowDetails }: { setShowDetails: (show: boolean) => void }) {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-center bg-white pb-8 pt-4">
      <Pressable
        onPress={() => setShowDetails(false)}
        className="h-14 w-[75vw] flex-row items-center justify-center gap-1 rounded-xl border-2 bg-white">
        <X size={20} color="black" strokeWidth={3} />
        <Text className="text-2xl text-black" style={{ fontFamily: 'Lexend_700Bold' }}>
          Close
        </Text>
      </Pressable>
    </View>
  );
}
