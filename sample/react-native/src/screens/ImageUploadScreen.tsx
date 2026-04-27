import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import { commonStyles } from '../styles/styles';

const { width } = Dimensions.get('window');
const imageSize = (width - 60) / 3;

const RenderImageItem = ({ uri, index }: { uri: string; index: number }) => (
  <View style={styles.imageWrapper}>
    <Image source={{ uri }} style={styles.image} resizeMode="cover" />
    <Text style={styles.imageNumber}>{index + 1}</Text>
  </View>
);

const EmptyState = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>No images selected yet.</Text>
  </View>
);

const ImageUploadScreen: React.FC = () => {
  const [selectedImages, setSelectedImages] = React.useState<Asset[]>([]);
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );
  const [permissionDenied, setPermissionDenied] =
    React.useState<boolean>(false);
  const [pickerActive, setPickerActive] = React.useState(false);

  React.useEffect(() => {
    checkMediaPermission();
  }, []);

  const checkMediaPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        const granted = await PermissionsAndroid.check(permission);
        setHasPermission(granted);
      } catch (err) {
        console.warn('Error checking media permission:', err);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true);
    }
  };

  const requestMediaPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const result = await PermissionsAndroid.request(permission, {
        title: 'Storage Permission',
        message: 'App needs access to your photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      const isGranted = result === PermissionsAndroid.RESULTS.GRANTED;
      setHasPermission(isGranted);
      setPermissionDenied(!isGranted);
      return isGranted;
    } catch (err) {
      console.warn('Error requesting storage permission:', err);
      setPermissionDenied(true);
      return false;
    }
  };

  const handleSelectImages = async () => {
    setPickerActive(true);
    if (Platform.OS === 'android' && !hasPermission) {
      const granted = await requestMediaPermission();
      if (!granted) {
        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select images.'
        );
        setPickerActive(false);
        return;
      }
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
        quality: 0.8,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert(
            'Gallery Error',
            response.errorMessage || 'Failed to open gallery'
          );
          console.error('Gallery error:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setSelectedImages(response.assets);
          console.log(`Selected ${response.assets.length} images`);
        }
      }
    );
    setPickerActive(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {Platform.OS === 'android' && permissionDenied && (
          <View style={styles.permissionWarning}>
            <Text style={styles.permissionWarningText}>
              Gallery permission is required to use this feature.
            </Text>
            <Text style={styles.permissionWarningSubtext}>
              Please enable gallery permission in your device settings.
            </Text>
          </View>
        )}

        <TouchableOpacityButton
          buttonText={
            permissionDenied ? 'Gallery Disabled' : 'Select Images from Gallery'
          }
          onPress={handleSelectImages}
          buttonStyle={[
            commonStyles.button,
            styles.selectButton,
            (permissionDenied || pickerActive) && styles.disabledButton,
          ]}
          textStyle={[commonStyles.buttonText, styles.buttonText]}
          disabled={permissionDenied || pickerActive}
        />
        {selectedImages.length > 0 && (
          <Text style={styles.countText}>
            {selectedImages.length} image
            {selectedImages.length !== 1 ? 's' : ''} selected
          </Text>
        )}
      </View>

      <FlatList
        data={selectedImages}
        renderItem={({ item, index }) => (
          <RenderImageItem uri={item.uri} index={index} />
        )}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
        style={styles.imageScrollView}
        contentContainerStyle={[
          styles.imageScrollContent,
          selectedImages.length === 0 && styles.contentCenter,
        ]}
        numColumns={3}
        columnWrapperStyle={
          selectedImages.length > 0 ? styles.imagesGrid : null
        }
        ListEmptyComponent={EmptyState}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

export default ImageUploadScreen;

const styles = StyleSheet.create({
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '400',
    margin: 'auto',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  permissionWarning: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#FFE69C',
    width: '100%',
  },
  permissionWarningText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    textAlign: 'center',
    marginBottom: 5,
  },
  permissionWarningSubtext: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: '#409cff',
    width: '100%',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  countText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  imageScrollView: {
    flex: 1,
  },
  imageScrollContent: {
    padding: 15,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    margin: 5,
    position: 'relative',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  imageNumber: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
