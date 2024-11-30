import * as Clipboard from 'expo-clipboard';
import { ClipboardPaste, Eraser, Scan } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { toast } from 'sonner-native';
import { ScanModal } from '~/components/modals';

export interface AddressInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const AddressInput = forwardRef<View, AddressInputProps>(({ value, onChangeText }, ref) => {
  const [showScan, setShowScan] = React.useState(false);

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text.startsWith('0x')) {
      onChangeText(text);
    } else {
      toast.error('Invalid address');
    }
  };

  return (
    <View ref={ref} className="w-full flex-row items-center justify-between rounded-lg">
      {value ? (
        <View className="flex-col items-start justify-between">
          <Text className="truncate text-5xl font-black" style={{ fontFamily: 'Lexend_700Bold' }}>
            {value.slice(0, 4)}...{value.slice(-3)}
          </Text>
        </View>
      ) : (
        <Text
          className="text-5xl font-black text-gray-400"
          style={{ fontFamily: 'Lexend_700Bold' }}>
          0x...
        </Text>
      )}
      <View className="mr-2 flex-row items-center justify-center gap-2">
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Eraser size={20} color="red" strokeWidth={3} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePaste}>
          <ClipboardPaste size={20} color="black" strokeWidth={3} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowScan(true)}>
          <Scan size={20} color="black" strokeWidth={3} />
        </TouchableOpacity>
      </View>
      <ScanModal showScan={showScan} setShowScan={setShowScan} onScan={onChangeText} />
    </View>
  );
});

AddressInput.displayName = 'AddressInput';
