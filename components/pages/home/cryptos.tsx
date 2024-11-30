import React, { useState } from 'react';
import { View } from 'react-native';

import { SendModal, SwapModal } from '../../modals';
import { Balance, Chart, Footer, Header, Infos, Trigger } from './components';

import { ExpandableModal, ModalContent, ModalTrigger, Separator } from '~/components/ui';
import { TokenType, tokens } from '~/config';

const CryptoCard = ({
  token,
  onShowExchange,
  onShowSend,
}: {
  token: TokenType;
  onShowExchange: (orderType: 'buy' | 'sell') => void;
  onShowSend: () => void;
}) => {
  return (
    <ExpandableModal>
      <ModalTrigger>
        <Trigger token={token} />
      </ModalTrigger>

      <ModalContent>
        <View className="relative flex-1">
          <Header token={token} />
          <Chart token={token} />
          <Separator />
          <Balance token={token} onShowSend={onShowSend} />
          <Separator />
          <Infos token={token} />
          <Footer token={token} onShowExchange={onShowExchange} />
        </View>
      </ModalContent>
    </ExpandableModal>
  );
};

const Cryptos = () => {
  const [showExchange, setShowExchange] = useState(false);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [showSend, setShowSend] = useState(false);
  const token: TokenType = tokens.ethereum;
  const token2: TokenType = tokens.usdc;

  const handleShowExchange = (type: 'buy' | 'sell', token: TokenType) => {
    setOrderType(type);
    setSelectedToken(token);
    setShowExchange(true);
  };

  const handleShowSend = (token: TokenType) => {
    setSelectedToken(token);
    setShowSend(true);
  };

  return (
    <>
      {Object.values(tokens).map((token) => (
        <CryptoCard
          key={token.coin}
          token={token}
          onShowExchange={(type) => handleShowExchange(type, token)}
          onShowSend={() => handleShowSend(token)}
        />
      ))}
      {selectedToken && (
        <SwapModal
          showExchange={showExchange}
          setShowExchange={setShowExchange}
          token={selectedToken}
          orderType={orderType}
        />
      )}
      {selectedToken && (
        <SendModal showSend={showSend} setShowSend={setShowSend} token={selectedToken} />
      )}
    </>
  );
};

export default Cryptos;
