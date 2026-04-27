import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

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
  const [selectedImages, setSelectedImages] = React.useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [pickerActive, setPickerActive] = React.useState(false);

  if (status === null) {
    return (
      <View style={styles.container}>
        <Text>Checking permissions...</Text>
      </View>
    );
  }

  const permissionDenied =
    status.status === ImagePicker.PermissionStatus.DENIED;

  const handleSelectImages = async () => {
    setPickerActive(true);
    if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) {
        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select images.'
        );
        setPickerActive(false);
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [],
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 0,
    });

    if (result.canceled) {
      console.log('User cancelled image picker');
    } else {
      setSelectedImages(result.assets);
      console.log(`Selected ${result.assets.length} images`);
    }

    setPickerActive(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {permissionDenied && (
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
            styles.selectButton,
            (permissionDenied || pickerActive) && styles.disabledButton,
          ]}
          textStyle={styles.buttonText}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonText: {
    margin: 'auto',
    color: '#000000',
    fontSize: 16,
    paddingLeft: 8,
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
    padding: 16,
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
    marginBottom: 5,
  },
  permissionWarningSubtext: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: '#0091ff',
    borderRadius: 10,
    width: '100%',
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
