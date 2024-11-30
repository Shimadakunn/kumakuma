import { Text } from 'components/ui/text';
import { ChartNoAxesGantt, ChartSpline, CreditCard } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { DepositModal, DetailsModal, SendModal, WithdrawModal } from '~/components/modals';
import { Button } from '~/components/ui';
import { tokens } from '~/config';

export default function Footer() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View className="my-4 w-full flex-row items-center justify-center gap-4">
      <Button
        onPress={() => setShowDetails(true)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
        <ChartNoAxesGantt size={25} color="black" strokeWidth={2.5} />
      </Button>

      <Button onPress={() => setShowWithdraw(true)} className="h-14 w-[35vw] rounded-xl bg-white">
        <View className="flex flex-row items-center justify-start gap-1">
          <ChartSpline size={20} color="black" strokeWidth={2.5} />
          <Text className="text-lg text-black" style={{ fontFamily: 'Lexend_700Bold' }}>
            Withd.
          </Text>
        </View>
      </Button>
      <Button
        onPress={() => setShowDeposit(true)}
        className="h-14 w-[35vw] rounded-xl bg-background">
        <View className="flex flex-row items-center justify-start gap-1">
          <CreditCard size={20} color="white" strokeWidth={2.5} />
          <Text className="text-lg text-white" style={{ fontFamily: 'Lexend_700Bold' }}>
            Depos.
          </Text>
        </View>
      </Button>

      <DepositModal showDeposit={showDeposit} setShowDeposit={setShowDeposit} />
      <WithdrawModal
        showWithdraw={showWithdraw}
        setShowWithdraw={setShowWithdraw}
        setShowSend={setShowSend}
      />
      <SendModal showSend={showSend} setShowSend={setShowSend} token={tokens.usdc} />
      <DetailsModal showDetails={showDetails} setShowDetails={setShowDetails} />
    </View>
  );
}
