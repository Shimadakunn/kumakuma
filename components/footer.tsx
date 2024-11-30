import { usePathname, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="absolute bottom-0 flex h-24 w-full flex-row items-start justify-around border-t border-gray-200 bg-background px-2 pt-4" />
  );
}
