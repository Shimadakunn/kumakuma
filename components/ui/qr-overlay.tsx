import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export const QROverlay = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.unfocusedArea} />
        <View style={styles.row}>
          <View style={styles.unfocusedArea} />
          <View style={styles.focusedArea}>
            {/* Corners */}
            {/* <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} /> */}
          </View>
          <View style={styles.unfocusedArea} />
        </View>
        <View style={styles.unfocusedArea} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
  },
  unfocusedArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  row: {
    flexDirection: 'row',
    height: SCAN_AREA_SIZE,
  },
  focusedArea: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 8,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
});
