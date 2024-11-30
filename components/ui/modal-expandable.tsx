import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const SPRING_CONFIG = {
  damping: 30,
  mass: 0.8,
  stiffness: 160,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

interface ExpandableModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  triggerLayout: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
  scrollOffset: Animated.SharedValue<number>;
}

const ExpandableModalContext = createContext<ExpandableModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  triggerLayout: null,
  setTriggerLayout: () => {},
  scrollOffset: { value: 0 } as Animated.SharedValue<number>,
});

export const useExpandableModal = () => useContext(ExpandableModalContext);

interface ExpandableModalProps {
  children: ReactNode;
}

export const ExpandableModal = ({ children }: ExpandableModalProps) => {
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setTimeout(() => {
      translateY.value = 0;
      setIsOpen(false);
    }, 400);
  };

  const progress = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const scrollOffset = useSharedValue(0);
  const isDraggingModal = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isDraggingModal.value = scrollOffset.value <= 0;
    })
    .onUpdate((event) => {
      if (!isOpen) return;

      if (isDraggingModal.value) {
        translateY.value = Math.max(0, event.translationY);
        const dragProgress = Math.min(event.translationY / SCREEN_HEIGHT, 1);
        progress.value = withSpring(1 - dragProgress * 0.5, { damping: 10, stiffness: 100 });
      }
    })
    .onEnd((event) => {
      if (!isDraggingModal.value) return;

      if (event.velocityY > 500 || event.translationY > SCREEN_HEIGHT * 0.2) {
        translateY.value = withSpring(SCREEN_HEIGHT, {
          ...SPRING_CONFIG,
          velocity: event.velocityY,
        });
        progress.value = withTiming(0, {
          duration: 400,
        });
        runOnJS(closeModal)();
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
        progress.value = withSpring(1, { damping: 15, stiffness: 100 });
      }
    });

  const rStyle = useAnimatedStyle(() => {
    if (!triggerLayout) return {};

    const height = interpolate(progress.value, [0, 1], [triggerLayout.height, SCREEN_HEIGHT]);
    const width = interpolate(progress.value, [0, 1], [triggerLayout.width, SCREEN_WIDTH]);
    const top = interpolate(progress.value, [0, 1], [triggerLayout.y, 0]);
    const left = interpolate(progress.value, [0, 1], [triggerLayout.x, 0]);

    const originY = triggerLayout.y + triggerLayout.height / 2;
    const originX = triggerLayout.x + triggerLayout.width / 2;

    return {
      position: 'absolute',
      height,
      width,
      top,
      left,
      transform: [
        { translateY: translateY.value },
        {
          scale: interpolate(progress.value, [0, 0.5, 1], [1, 1.05, 1]),
        },
      ],
      opacity: interpolate(progress.value, [0, 0.1], [0, 1]),
      pointerEvents: isOpen ? 'auto' : 'none',
      backgroundColor: 'white',
      borderRadius: interpolate(progress.value, [0, 1], [8, 0]),
      zIndex: 1000,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: interpolate(progress.value, [0, 1], [2, 5]),
      },
      shadowOpacity: interpolate(progress.value, [0, 1], [0.1, 0.3]),
      shadowRadius: interpolate(progress.value, [0, 1], [4, 12]),
      elevation: interpolate(progress.value, [0, 1], [2, 8]),
    };
  });

  React.useEffect(() => {
    if (isOpen) {
      progress.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
        mass: 0.6,
      });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
      });
    } else {
      progress.value = withTiming(0, {
        duration: 400,
      });
    }
  }, [isOpen]);

  // Find the ModalTrigger and ModalContent children
  const triggerChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ModalTrigger
  );

  const contentChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ModalContent
  );

  return (
    <ExpandableModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        triggerLayout,
        setTriggerLayout,
        scrollOffset,
      }}>
      {triggerChild}
      <GestureDetector gesture={gesture}>
        <Animated.View style={rStyle}>
          <View style={{ paddingTop: insets.top, flex: 1 }}>
            <View style={styles.dragIndicator} />
            <View style={{ flex: 1, paddingBottom: insets.bottom }}>{contentChild}</View>
          </View>
        </Animated.View>
      </GestureDetector>
    </ExpandableModalContext.Provider>
  );
};

export const ModalTrigger = ({ children }: { children: ReactNode }) => {
  const { openModal, setTriggerLayout } = useExpandableModal();

  const measureTrigger = (event: LayoutChangeEvent) => {
    event.target.measure((x, y, width, height, pageX, pageY) => {
      setTriggerLayout({ x: pageX, y: pageY, width, height });
    });
  };

  return (
    <Pressable onPress={openModal} onLayout={measureTrigger}>
      {children}
    </Pressable>
  );
};

export const ModalContent = ({ children }: { children: ReactNode }) => {
  const { isOpen, scrollOffset, closeModal } = useExpandableModal();

  const handleScroll = (event: any) => {
    scrollOffset.value = event.nativeEvent.contentOffset.y;
  };

  const handleScrollBeginDrag = (event: any) => {
    // If we're at the top and trying to scroll up further, close the modal
    if (scrollOffset.value <= 0 && event.nativeEvent.velocity.y > 0) {
      closeModal();
    }
  };

  if (!isOpen) return null;
  return (
    <View style={styles.content}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ScrollView) {
          return React.cloneElement(child, {
            onScroll: handleScroll,
            onScrollBeginDrag: handleScrollBeginDrag,
            scrollEventThrottle: 16,
            bounces: false, // Prevents iOS bounce effect
            overScrollMode: 'never', // Prevents Android over-scroll effect
            ...child.props,
          });
        }
        return child;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  dragIndicator: {
    width: 50,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
