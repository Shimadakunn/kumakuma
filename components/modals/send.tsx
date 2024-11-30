import { Send } from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';

import { ReviewModal } from './review';

import { AddressInput, AmountView, Button, Modal, NumPad, Text } from '~/components/ui';
import { TokenType } from '~/config';

interface SendProps {
  showSend: boolean;
  setShowSend: (show: boolean) => void;
  token: TokenType;
}

const SendModal = ({ showSend, setShowSend, token }: SendProps) => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [reviewing, setReviewing] = useState(false);
  const handleNumberPress = (value: string) => {
    if (value === 'delete') {
      setAmount((prev) => prev.slice(0, -1));
    } else if (value === '.' && amount.includes('.')) {
    } else if (amount.length >= 6 && value !== 'delete') {
    } else {
      const newAmount = amount + value;
      const numericAmount = parseFloat(newAmount);

      if (!isNaN(numericAmount) && numericAmount <= Number(token.balance)) {
        setAmount(newAmount);
      }
    }
  };

  return (
    <Modal
      isVisible={showSend}
      hideModal={() => setShowSend(false)}
      height={reviewing ? 0.38 : 0.68}>
      {reviewing ? (
        <ReviewModal token={token} amount={amount} setReviewing={setReviewing} />
      ) : (
        <>
          <View className="mb-4 flex w-full flex-row items-center justify-start gap-2">
            <Send size={20} color="black" strokeWidth={3} />
            <Text className="text-2xl" style={{ fontFamily: 'Lexend_700Bold' }}>
              Send
            </Text>
          </View>

          <AddressInput value={address} onChangeText={setAddress} />

          {/* Buying Crypto */}
          <AmountView value={amount} onChangeText={setAmount} token={token} />
          {/* Number Pad */}
          <NumPad handleNumberPress={handleNumberPress} className="mt-4" />

          {/* Action Button */}
          <View className="w-full">
            <Button
              onPress={() => setReviewing(true)}
              className="h-14 w-full flex-row items-center justify-center gap-1 rounded-xl bg-background py-1">
              <Send size={20} color="white" strokeWidth={2.5} />
              <Text className="text-2xl text-white" style={{ fontFamily: 'Lexend_700Bold' }}>
                Send
              </Text>
            </Button>
          </View>
        </>
      )}
    </Modal>
  );
};

export { SendModal };
