import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';

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
  return (
    <View className="flex h-full items-center justify-center ">
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
    </View>
  );
}
