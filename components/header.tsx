import { Image, View } from 'react-native';

import Logo from '../public/logo.png';
import { Text } from './ui/text';

export default function Header() {
  return (
    <View className="fl flex h-16 w-full flex-row items-center justify-between bg-background px-2">
      <View className="flex flex-row items-center justify-center gap-1">
        <Image source={Logo} className="h-8 w-8" />
        <Text className="text-3xl font-bold text-white" style={{ fontFamily: 'GaeilgeKids' }}>
          Shima
        </Text>
      </View>
    </View>
  );
}
