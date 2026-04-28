import React from 'react';
import { View, Text, Image, StyleSheet, Alert, Linking } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import { commonStyles } from '../styles/styles';

const CameraScreen: React.FC = () => {
  const cameraRef = React.useRef<Camera>(null);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [capturing, setCapturing] = React.useState(false);

  const handleCapture = async () => {
    let granted = hasPermission;

    if (!granted) {
      granted = await requestPermission();
    }

    if (!granted) {
      Alert.alert('Permission Required', 'Camera permission is required.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
      return;
    }

    if (!cameraRef.current) return;

    try {
      setCapturing(true);
      const photo = await cameraRef.current.takePhoto();
      setCapturedImage(`file://${photo.path}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Camera Error', 'Failed to capture image');
    } finally {
      setCapturing(false);
    }
  };

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraSection}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacityButton
          buttonText="Capture Photo"
          onPress={handleCapture}
          buttonStyle={[
            commonStyles.button,
            styles.captureButton,
            capturing && styles.disabledButton,
          ]}
          disabled={capturing}
          textStyle={[commonStyles.buttonText]}
        />

        {capturedImage ? (
          <>
            <Text style={styles.label}>Captured Image</Text>
            <Image
              source={{ uri: capturedImage }}
              style={styles.image}
              resizeMode="contain"
            />
            <TouchableOpacityButton
              buttonText="Clear Photo"
              onPress={() => setCapturedImage(null)}
              buttonStyle={[commonStyles.button, styles.clearButton]}
              textStyle={[commonStyles.buttonText]}
            />
          </>
        ) : (
          <Text style={styles.placeholderText}>No image captured yet.</Text>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: '400',
    margin: 'auto',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraSection: {
    flex: 1,
    backgroundColor: '#000',
  },
  bottomSection: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#0091ff',
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
  },
  clearButton: {
    backgroundColor: '#fc655d',
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
