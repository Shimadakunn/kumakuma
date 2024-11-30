import { AlignLeft } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { Text } from '~/components/ui';

export function Description() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="flex w-full flex-col px-6 py-4">
      <View className="flex-row items-center gap-1">
        <AlignLeft size={13} color="gray" strokeWidth={2.5} />
        <Text className="text-sm" style={{ fontFamily: 'Lexend_700Bold' }}>
          Description
        </Text>
      </View>
      <View className="flex w-full flex-col">
        <Text
          numberOfLines={isExpanded ? undefined : 3}
          className="text-sm text-gray-500"
          style={{ fontFamily: 'Lexend_700Bold' }}>
          Morpho Labs is a company that provides a platform for creating and trading
          yield-generating assets. the yield is generated by the staking of the assets in the Morpho
          protocol. Morpho Labs is a company that provides a platform for creating and trading
          yield-generating assets. the yield is generated by the staking of the assets in the Morpho
          protocol. Morpho Labs is a company that provides a platform for creating and trading
          yield-generating assets. the yield is generated by the staking of the assets in the Morpho
          protocol. Morpho Labs is a company that provides a platform for creating and trading
          yield-generating assets. the yield is generated by the staking of the assets in the Morpho
          protocol. Morpho Labs is a company that provides a platform for creating and trading
          yield-generating assets. the yield is generated by the staking of the assets in the Morpho
          protocol. Morpho Labs is a company that provides a platform for creating and trading
          yield-generating assets. the yield is generated by the staking of the assets in the Morpho
          protocol. Morpho Labs is a company that provides a platform for creating and trading
          yield-generating assets. the yield is generated by the staking of the assets in the Morpho
          protocol.
        </Text>
        <Text
          onPress={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-sm text-blue-500"
          style={{ fontFamily: 'Lexend_700Bold' }}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      </View>
    </View>
  );
}