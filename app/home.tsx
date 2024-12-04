import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Balance, Chart, Footer, Header, Vault } from '~/components/pages/home';

export default function Home() {
  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const address = new URL(url).searchParams.get('address');
      if (address) {
        console.log('Address received:', address);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView className="h-full border bg-white pb-8" edges={['top', 'left', 'right']}>
        <Header />
        <Balance />
        <Chart />
        <Vault />
        <Footer />
      </SafeAreaView>
    </>
  );
}
