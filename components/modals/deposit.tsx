import { Copy, CreditCard } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

import { Button, FullScreenModal, Text } from '~/components/ui';
import { tokenIcons } from '~/config';

interface DepositProps {
  showDeposit: boolean;
  setShowDeposit: (show: boolean) => void;
}

const DepositModal = ({ showDeposit, setShowDeposit }: DepositProps) => {
  return (
    <FullScreenModal visible={showDeposit} onClose={() => setShowDeposit(false)}>
      <View className="absolute top-[20%] w-full items-center justify-center">
        <Text className="text-center text-xl font-bold" style={{ fontFamily: 'Lexend_700Bold' }}>
          Wallet Address
        </Text>
        <View className="mb-6 flex-row items-center justify-center gap-2">
          <Text
            className="text-center text-lg font-bold text-gray-500"
            style={{ fontFamily: 'Lexend_700Bold' }}>
            0x23...789
          </Text>
          <Pressable onPress={() => {}}>
            <Copy size={15} color="#6b7280" />
          </Pressable>
        </View>
        <QRCodeStyled
          data="0x722D03412641D7ae687600Ad02a8E59B1C6FF27d"
          style={{ backgroundColor: 'white' }}
          pieceSize={7}
          pieceBorderRadius={3}
          outerEyesOptions={{
            topLeft: {
              borderRadius: [10, 10, 10, 10],
            },
            topRight: {
              borderRadius: [10, 10, 10, 10],
            },
            bottomLeft: {
              borderRadius: [10, 10, 10, 10],
            },
          }}
          innerEyesOptions={{
            borderRadius: 4,
            scale: 1.1,
          }}
          logo={{
            href: require('~/public/logo.png'),
            padding: 1,
            scale: 1.5,
            // hidePieces: false,
          }}
          color="#556CDE"
        />
        <View className="mt-6 flex-row items-center justify-center gap-1 rounded-xl bg-gray-200 px-4 py-2">
          <Image source={tokenIcons.usdc} className="h-5 w-5" />
          <Text
            className="text-center font-bold text-gray-700"
            style={{ fontFamily: 'Lexend_700Bold' }}>
            on Ethereum
          </Text>
        </View>
      </View>
      <View className="absolute bottom-12 h-12 w-full">
        <Button
          onPress={() => setShowDeposit(false)}
          className="mx-auto flex h-14 w-[75%] flex-row items-center justify-start gap-1 rounded-xl border-2 bg-background">
          <CreditCard size={20} color="white" strokeWidth={2.5} />
          <Text className="text-lg text-white" style={{ fontFamily: 'Lexend_700Bold' }}>
            Buy with Card
          </Text>
        </Button>
      </View>
    </FullScreenModal>
  );
};

export { DepositModal };
