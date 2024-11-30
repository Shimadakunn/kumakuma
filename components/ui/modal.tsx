import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import ModalComponent, { ModalProps } from 'react-native-modal';

interface Props {
  hideModal: () => void;
  hideCloseButton?: boolean;
  style?: StyleProp<ViewStyle>;
  height?: number;
}

const Modal = ({
  hideModal,
  hideCloseButton,
  style,
  children,
  height,
  ...props
}: Props & Partial<ModalProps>) => {
  const [offsetY, setOffsetY] = useState(0);

  return (
    <ModalComponent
      {...props}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={400}
      animationOutTiming={300}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={300}
      useNativeDriver
      swipeDirection="down"
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      onSwipeComplete={() => {
        setOffsetY(0);
        hideModal();
      }}
      style={styles.modalContainer}
      onSwipeMove={(percentageShown: number) => {
        const newOffset = Math.max(0, 1 - percentageShown) * 100;
        setOffsetY(newOffset);
      }}
      propagateSwipe
      swipeThreshold={50}
      onModalHide={() => {
        setOffsetY(0);
      }}>
      <View
        style={[
          styles.modal,
          style,
          {
            transform: [{ translateY: Math.max(0, offsetY) }],
            flex: height || 0.85,
          },
        ]}>
        <View style={styles.indicator} />
        {children}
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
    height: 40,
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: '#52525b',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 6,
  },
  modal: {
    borderWidth: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  text: {
    fontSize: 20,
  },
});

export default Modal;
