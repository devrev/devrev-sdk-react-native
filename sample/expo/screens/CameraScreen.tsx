import React from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import { CameraType } from 'expo-image-picker';

const CameraScreen: React.FC = () => {
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);
  const [isCameraReady, setIsCameraReady] = React.useState(false);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          exif: false,
        });
        if (photo?.uri) {
          setCapturedImage(photo.uri);
          console.log('Image captured:', photo.uri);
        }
      } catch (error) {
        Alert.alert('Error', 'Could not take photo');
        console.error(error);
      }
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Checking permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {!permission.granted ? (
          <View style={styles.permissionWarning}>
            <Text style={styles.permissionWarningText}>
              Camera permission is required.
            </Text>
            <TouchableOpacityButton
              buttonText="Grant Permission"
              onPress={requestPermission}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        ) : (
          <View style={styles.cameraWrapper}>
            <CameraView
              onCameraReady={() => setIsCameraReady(true)}
              style={styles.camera}
              facing={CameraType.back}
              ref={cameraRef}
            />
            <TouchableOpacityButton
              buttonText="Take Photo"
              onPress={takePicture}
              buttonStyle={[styles.button, styles.cameraButton]}
              textStyle={styles.buttonText}
            />
          </View>
        )}
      </View>

      <View style={styles.bottomSection}>
        {capturedImage ? (
          <>
            <Text style={styles.label}>Captured Image Preview</Text>
            <Image
              source={{ uri: capturedImage }}
              style={styles.image}
              resizeMode="cover"
            />
            <TouchableOpacityButton
              buttonText="Clear Photo"
              onPress={() => setCapturedImage(null)}
              buttonStyle={[styles.button, styles.clearButton]}
              textStyle={styles.buttonText}
            />
          </>
        ) : (
          <Text style={styles.placeholderText}>
            Your captured photo will appear here.
          </Text>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D3D3D3',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    alignItems: 'flex-start',
    paddingBottom: 8,
  },
  buttonText: {
    margin: 'auto',
    color: '#000000',
    fontSize: 16,
    paddingLeft: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  cameraWrapper: {
    width: '100%',
    height: '80%',
    overflow: 'hidden',
    borderRadius: 15,
  },
  camera: {
    flex: 1,
    height: '100%',
  },
  permissionWarning: {
    backgroundColor: '#FFF3CD',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE69C',
    width: '100%',
  },
  permissionWarningText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    textAlign: 'center',
    marginBottom: 10,
  },
  cameraButton: {
    marginTop: 10,
    backgroundColor: '#0091ff',
    borderRadius: 10,
    width: '100%',
  },
  clearButton: {
    backgroundColor: '#fc655d',
    borderRadius: 10,
    width: '100%',
  },
  bottomSection: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
