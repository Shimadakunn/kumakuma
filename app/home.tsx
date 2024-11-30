import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Balance, Chart, Footer, Header, Vault } from '~/components/pages/home';

export default function Home() {
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
