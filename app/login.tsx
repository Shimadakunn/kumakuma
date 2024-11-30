import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Login } from '~/components/pages/login';

export default function LoginPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView className="h-full border bg-white">
        <Login />
      </SafeAreaView>
    </>
  );
}
