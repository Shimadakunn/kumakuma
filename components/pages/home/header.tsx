import { Settings } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, View } from 'react-native';

import { Text } from '~/components/ui';

export default function Header() {
  return (
    <View className="flex flex-row items-center justify-between px-6 py-4">
      <View className="flex flex-row items-center gap-1">
        <Image source={require('~/public/logo.png')} className="h-8 w-8" />
        <Text className="text-3xl font-black" style={{ fontFamily: 'Lexend_900Black' }}>
          Morpho
        </Text>
      </View>
      <Pressable
        onPress={() => {}}
        className="flex h-10 w-10 items-center justify-center rounded-full  bg-white ">
        <Settings size={20} color="black" strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}
