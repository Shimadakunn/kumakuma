import React from 'react';
import { ScrollView, View } from 'react-native';

import { Balance, Chart, Description, Footer, Header, Stats } from './components';

import { FullScreenModal } from '~/components/ui';

interface DetailsProps {
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
}

const DetailsModal = ({ showDetails, setShowDetails }: DetailsProps) => {
  return (
    <FullScreenModal visible={showDetails} onClose={() => setShowDetails(false)}>
      <View className="relative flex-1">
        <ScrollView className="mb-28 flex-1">
          <Header />
          <Chart />
          <View className="mx-auto w-[90%] border border-gray-300" />
          <Balance />
          <View className="mx-auto w-[90%] border border-gray-300" />
          <Stats />
          <View className="mx-auto w-[90%] border border-gray-300" />
          <Description />
        </ScrollView>
        <Footer setShowDetails={setShowDetails} />
      </View>
    </FullScreenModal>
  );
};

export { DetailsModal };
