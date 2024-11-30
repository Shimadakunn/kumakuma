import LottieView from 'lottie-react-native';
import { ArrowDown, ChevronLeft, Info } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Slider } from '~/components/ui';
import { tokenIcons, TokenType } from '~/config';

export function ReviewModal({
  token,
  amount,
  to,
  setReviewing,
}: {
  token: TokenType;
  amount: string;
  to?: string;
  setReviewing: (value: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const animationRef = useRef<LottieView>(null);
  return (
    <View className="flex-1">
      {isLoading && (
        <>
          <LottieView
            ref={animationRef}
            source={require('~/public/animation/loading.json')}
            autoPlay
            loop
            style={{
              width: 250,
              height: 250,
            }}
          />
          <Text
            className="text-center text-2xl font-black"
            style={{ fontFamily: 'Lexend_700Bold' }}>
            Verifying transaction...
          </Text>
        </>
      )}
      {!isLoading && (
        <>
          <Text className="text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
            Review
          </Text>
          <View className="mb-2 mt-1 flex w-full flex-row items-center justify-between">
            <View className=" ">
              <Text className="text-3xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
                0.001 ETH
              </Text>
              <Text className="text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
                250.32 $US
              </Text>
            </View>

            <Image
              source={tokenIcons[token.coin as keyof typeof tokenIcons]}
              className=" h-10 w-10"
            />
          </View>
          <View className="flex w-full flex-row items-center justify-between">
            <ArrowDown size={20} color="gray" strokeWidth={2.5} />
          </View>
          <View className="flex w-full flex-row items-center justify-between">
            <View className=" ">
              <Text className="text-3xl font-black" style={{ fontFamily: 'GaeilgeKids' }}>
                0.001 ETH
              </Text>
              <Text className="text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
                250.32 $US
              </Text>
            </View>

            <Image
              source={tokenIcons[token.coin as keyof typeof tokenIcons]}
              className=" h-10 w-10"
            />
          </View>
          <View className="my-4 w-auto border border-gray-300" />
          <View className="flex w-full flex-row items-center justify-between ">
            <View className="flex flex-row items-center justify-center gap-1">
              <Text className="text-sm text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
                Fees
              </Text>
              <Info size={13} color="gray" strokeWidth={2.5} />
            </View>
            <Text className=" font-black" style={{ fontFamily: 'GaeilgeKids' }}>
              1 %
            </Text>
          </View>
          <View className="flex w-full flex-row items-center justify-between ">
            <View className="flex flex-row items-center justify-center gap-1">
              <Text className="text-sm text-gray-500" style={{ fontFamily: 'Lexend_700Bold' }}>
                Estimated Time
              </Text>
              <Info size={13} color="gray" strokeWidth={2.5} />
            </View>
            <Text className="text-sm">~ 10 seconds</Text>
          </View>
          <View className="my-2 w-full flex-row items-center justify-between">
            <Pressable
              onPress={() => setReviewing(false)}
              className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-gray-600 py-1">
              <ChevronLeft size={25} color="#374151" strokeWidth={3} />
            </Pressable>
            <Slider title="Swap" onSlideEnd={() => {}} width={250} />
          </View>
        </>
      )}
    </View>
  );
}
