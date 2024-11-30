import { Modal, StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface FullScreenModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const FullScreenModal = ({ visible, onClose, children }: FullScreenModalProps) => {
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      // Only allow dragging downwards
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    },
    onEnd: (event) => {
      // If dragged down more than 100 units, close the modal
      if (event.translationY > 100) {
        runOnJS(onClose)();
      }
      // Spring back to original position
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container} className="bg-transparent">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.content, animatedStyle]}>
            <View style={styles.dragIndicator} />
            {children}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 24,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: '92%',
    width: '100%',
    position: 'relative',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#52525b',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
});
