import * as Haptics from 'expo-haptics';
import { ChevronsRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import SlideButton from 'rn-slide-button';

interface SlideButtonProps {
  title: string;
  onSlideEnd: () => void;
  width?: number;
}

const Slider = ({ title, onSlideEnd, width = 300 }: SlideButtonProps) => {
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (sliding) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      interval = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [sliding]);

  return (
    <SlideButton
      title={title}
      width={width}
      titleStyle={{ fontFamily: 'Lexend_700Bold', fontSize: 25 }}
      icon={<ChevronsRight size={25} color="black" strokeWidth={3} />}
      thumbStyle={{ borderColor: 'black', borderWidth: 2 }}
      containerStyle={{ backgroundColor: '#556CDE', borderColor: 'black', borderWidth: 2 }}
      underlayStyle={{ backgroundColor: '#556CDE' }}
      animation
      onSlideStart={() => {
        setSliding(true);
      }}
      onSlideEnd={() => {
        setSliding(false);
      }}
      onReachedToEnd={onSlideEnd}
    />
  );
};

export { Slider };
