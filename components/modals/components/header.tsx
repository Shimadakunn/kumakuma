import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { Image, Text, View } from 'react-native';

import { tokenIcons } from '~/config';

export function Header() {
  const animationRef = useRef<LottieView>(null);
  return (
    <View className="h-[14vh] w-full flex-row items-end justify-between px-6 py-4">
      <View className="flex-col items-start justify-between">
        <Image source={tokenIcons.usdc} className="h-14 w-14" />
        <View className="flex-row items-center justify-center gap-1">
          <Text className="mt-1 text-2xl" style={{ fontFamily: 'Lexend_700Bold' }}>
            Morpho Labs Vault
          </Text>
          <View className="mt-1">
            <LottieView
              ref={animationRef}
              source={require('~/public/animation/verified.json')}
              autoPlay
              loop
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
        </View>
      </View>
      <View className="h-full flex-col items-end justify-end">
        <Text className="text-xl text-gray-500" style={{ fontFamily: 'GaeilgeKids' }}>
          + 0%
        </Text>
        <Text className="text-3xl" style={{ fontFamily: 'GaeilgeKids' }}>
          14.35%
        </Text>
      </View>
    </View>
  );
}
