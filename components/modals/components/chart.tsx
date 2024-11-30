import * as haptics from 'expo-haptics';
import { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

import { Text } from '~/components/ui';
const data = [
  {
    timestamp: 1625945400000,
    value: 33575.25,
  },
  {
    timestamp: 1625946300000,
    value: 33545.25,
  },
  {
    timestamp: 1625947200000,
    value: 33510.25,
  },
  {
    timestamp: 1625948100000,
    value: 33215.25,
  },
];

export function Chart() {
  const [timeFrame, setTimeFrame] = useState('1h');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
  }

  const onCurrentIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
    setDragging(true);
    console.log('Dragging:', dragging);
    invokeHaptic();
  }, []);

  return (
    <View className="">
      <LineChart.Provider data={data} onCurrentIndexChange={onCurrentIndexChange}>
        <LineChart width={350} height={200} className="">
          <LineChart.Path>
            <LineChart.Dot color="black" at={3} hasPulse />
          </LineChart.Path>
          <LineChart.CursorCrosshair
            color="black"
            onActivated={invokeHaptic}
            onEnded={() => {
              console.log('Dragging:', dragging);
              setDragging(false);
              invokeHaptic();
            }}
          />
          <LineChart.CursorLine color="lightgray" />
        </LineChart>
      </LineChart.Provider>
      <View className="mx-auto mb-4 flex w-[70%] flex-row justify-between">
        <TouchableOpacity
          onPress={() => setTimeFrame('1h')}
          className={`rounded-full ${timeFrame === '1h' ? 'bg-gray-300' : ''} p-2`}>
          <Text className={`${timeFrame === '1h' ? 'text-black' : 'text-gray-500'}`}>1H</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTimeFrame('1d')}
          className={`rounded-full ${timeFrame === '1d' ? 'bg-gray-300' : ''} p-2`}>
          <Text className={`${timeFrame === '1d' ? 'text-black' : 'text-gray-500'}`}>1D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTimeFrame('1w')}
          className={`rounded-full ${timeFrame === '1w' ? 'bg-gray-300' : ''} p-2`}>
          <Text className={`${timeFrame === '1w' ? 'text-black' : 'text-gray-500'}`}>1W</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTimeFrame('1m')}
          className={`rounded-full ${timeFrame === '1m' ? 'bg-gray-300' : ''} p-2`}>
          <Text className={`${timeFrame === '1m' ? 'text-black' : 'text-gray-500'}`}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTimeFrame('1y')}
          className={`rounded-full ${timeFrame === '1y' ? 'bg-gray-300' : ''} p-2`}>
          <Text className={`${timeFrame === '1y' ? 'text-black' : 'text-gray-500'}`}>1Y</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
