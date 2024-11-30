import { Landmark, Send } from 'lucide-react-native';

import { Button, Modal, Text } from '~/components/ui';

interface WithdrawProps {
  showWithdraw: boolean;
  setShowWithdraw: (show: boolean) => void;
  setShowSend: (show: boolean) => void;
}

const WithdrawModal = ({ showWithdraw, setShowWithdraw, setShowSend }: WithdrawProps) => {
  return (
    <Modal isVisible={showWithdraw} hideModal={() => setShowWithdraw(false)} height={0.2}>
      <Text
        className="mb-4 text-center text-2xl font-black"
        style={{ fontFamily: 'Lexend_700Bold' }}>
        Withdraw
      </Text>
      <Button
        onPress={() => {
          //   setShowWithdraw(false);
          setShowSend(true);
        }}
        className="mx-auto mb-2 flex h-14 w-[75vw] flex-row items-center justify-start gap-1 rounded-xl border-2 bg-white">
        <Send size={20} color="black" strokeWidth={2.5} />
        <Text className="text-xl text-black" style={{ fontFamily: 'Lexend_700Bold' }}>
          Send to Wallet
        </Text>
      </Button>
      <Button
        onPress={() => setShowWithdraw(false)}
        className="mx-auto flex h-14 w-[75vw] flex-row items-center justify-start gap-1 rounded-xl border-2 bg-background">
        <Landmark size={20} color="white" strokeWidth={2.5} />
        <Text className="text-xl text-white" style={{ fontFamily: 'Lexend_700Bold' }}>
          Withdraw to Bank
        </Text>
      </Button>
    </Modal>
  );
};

export { WithdrawModal };
