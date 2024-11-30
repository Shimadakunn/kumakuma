import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Image as ImageIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { toast } from 'sonner-native';

import { FullScreenModal } from '../ui/modal-full-screen';

import { QROverlay } from '~/components/ui/qr-overlay';

interface ScanProps {
  showScan: boolean;
  setShowScan: (show: boolean) => void;
  onScan: (data: string) => void;
}

const ScanModal = ({ showScan, setShowScan, onScan }: ScanProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    if (showScan) {
      if (permission?.status === 'undetermined') {
        requestPermission();
      }
      if (galleryPermission?.status === 'undetermined') {
        requestGalleryPermission();
      }
    }
  }, [permission, showScan]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri.startsWith('0x')) {
      onScan(result.assets[0].uri);
      setShowScan(false);
    } else {
      toast.error('Invalid address');
    }
  };

  return (
    <FullScreenModal visible={showScan} onClose={() => setShowScan(false)}>
      <View className="absolute right-1/2 top-0 h-12 w-12 translate-x-1/2 translate-y-1/2 " />
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data.startsWith('0x')) {
              onScan(data);
              setShowScan(false);
            } else {
              toast.error('Invalid address');
            }
          }}
        />
        <QROverlay />
      </View>

      <TouchableOpacity
        onPress={pickImage}
        className="absolute bottom-1/4 right-1/2 translate-x-1/2">
        <ImageIcon size={24} color="white" />
      </TouchableOpacity>
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Lexend_700Bold',
  },
  dragIndicator: {
    position: 'absolute',
    top: 12,
    width: 40,
    height: 4,
    backgroundColor: '#ffffff50',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  galleryButton: {
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
  },
  instructions: {
    position: 'absolute',
    bottom: 0,
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
});

export { ScanModal };
