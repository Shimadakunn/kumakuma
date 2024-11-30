import { useRef, useState } from 'react';
import { Pressable, Animated, ViewStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  className?: string;
}

export function Button({ children, onPress, className }: ButtonProps) {
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [isPressed, setIsPressed] = useState(false);

  const animatePress = (pressed: boolean) => {
    setIsPressed(pressed);
    Animated.spring(translate, {
      toValue: pressed ? { x: 2, y: 2 } : { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={() => animatePress(true)}
      onPressOut={() => animatePress(false)}
      onPress={onPress}>
      <Animated.View
        className={`border-border items-center justify-center rounded-full border-2 ${className}`}
        style={{
          transform: translate.getTranslateTransform(),
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: isPressed ? 0 : 1,
          shadowRadius: 0,
          elevation: isPressed ? 0 : 2,
        }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
