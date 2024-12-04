import { router, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Pressable, TextInput, View } from 'react-native';

import { Button, Text } from '~/components/ui';
import { useMe } from '~/providers/MeProvider';

const Actions = () => {
  const [creating, setCreating] = useState(false);
  const [username, setUsername] = useState('');
  const { create, get, returning, isLoading } = useMe();
  return (
    <View className="mb-2 flex flex-row items-center justify-center gap-2">
      {!creating ? (
        <>
          <Button
            onPress={() => {
              setCreating(true);
            }}
            className=" h-14 w-[42vw] rounded-xl bg-white">
            <View className="flex flex-row items-center justify-start gap-2">
              <Text className="text-2xl text-black" style={{ fontFamily: 'Lexend_900Black' }}>
                Create
              </Text>
              <Image source={require('~/public/logo.png')} className="h-6 w-6" />
            </View>
          </Button>
          <Button
            onPress={() => {
              router.push('/home');
            }}
            className=" h-14 w-[42vw] rounded-xl bg-background">
            <View className="flex flex-row items-center justify-start gap-2">
              <Text className="text-2xl text-white" style={{ fontFamily: 'Lexend_900Black' }}>
                Connect
              </Text>
              <Image source={require('~/public/logo.png')} className="h-6 w-6" />
            </View>
          </Button>
        </>
      ) : (
        <>
          <Pressable
            onPress={() => {
              setCreating(false);
            }}
            className="h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-white">
            <ChevronLeft size={24} color="black" />
          </Pressable>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            className="h-14 w-[42vw] rounded-xl border-2 border-black px-2"
          />
          <Button
            onPress={() => {
              create(username);
            }}
            className="h-14 w-24 rounded-xl bg-background">
            <Image source={require('~/public/logo.png')} className="h-6 w-6" />
          </Button>
        </>
      )}
    </View>
  );
};

export default function Login() {
  const { address } = useLocalSearchParams<{ address: string }>();

  useEffect(() => {
    // If we receive an address parameter, redirect to home
    if (address) {
      router.replace('/home');
    }
  }, [address]);

  const handleUrl = ({ url }: { url: string }) => {
    try {
      const urlObj = new URL(url);
      const addressParam = urlObj.searchParams.get('address');

      if (addressParam) {
        router.replace('/home');
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
    }
  };

  useEffect(() => {
    // Handle deep linking
    Linking.addEventListener('url', handleUrl);

    // Check if app was opened from a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial URL:', url);
        handleUrl({ url });
      }
    });
  }, []);

  const openBrowser = async () => {
    try {
      // Replace with your web app URL
      // Add your app's custom URL scheme as a parameter
      const result = await WebBrowser.openAuthSessionAsync(
        'https://kuma-auth.vercel.app/?app=kuma',
        'kuma://callback'
      );

      if (result.type === 'success') {
        // Handle successful authentication
        console.log('Auth successful:', result);
      }
    } catch (error) {
      console.error('Error opening browser:', error);
    }
  };

  return (
    <View className="flex h-full items-center justify-center border">
      <View className="flex flex-1 flex-row items-center gap-1 ">
        <Image source={require('~/public/logo.png')} className="h-10 w-10" />
        <Text className="text-4xl font-black" style={{ fontFamily: 'Lexend_900Black' }}>
          Morpho Labs
        </Text>
      </View>
      <Image source={require('~/public/illustration.png')} className="h-[67%] w-full " />
      <View className="my-6 flex flex-col items-center">
        <Text className="text-3xl font-black" style={{ fontFamily: 'Lexend_900Black' }}>
          Unlock the Future of
        </Text>
        <Text className="text-3xl font-black" style={{ fontFamily: 'Lexend_900Black' }}>
          Decentralised Finance
        </Text>
      </View>
      <Actions />

      <Button onPress={openBrowser}>
        <Text>Open Browser</Text>
      </Button>
    </View>
  );
}
