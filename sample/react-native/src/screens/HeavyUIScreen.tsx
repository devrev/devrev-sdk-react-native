import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import LottieView, { AnimationObject } from 'lottie-react-native';
import WebView from 'react-native-webview';
import DevRevVideo from '../assets/devrev.mp4';

const RemoteLottie: React.FC<{ url: string; style: object }> = ({
  url,
  style,
}) => {
  const [data, setData] = useState<AnimationObject | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!data) {
    return <View style={style} />;
  }

  return <LottieView source={data} autoPlay loop style={style} />;
};

const devRevVideoUri = Image.resolveAssetSource(DevRevVideo).uri;
const videoHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      html, body { margin: 0; padding: 0; background: #000; height: 100%; }
      video { width: 100%; height: 100%; object-fit: cover; background: #000; }
    </style>
  </head>
  <body>
    <video src="${devRevVideoUri}" controls autoplay loop muted playsinline></video>
  </body>
</html>`;

const LottieAnimationURLs = [
  [
    'https://assets9.lottiefiles.com/packages/lf20_jbrw3hcz.json',
    'https://assets1.lottiefiles.com/packages/lf20_touohxv0.json',
    'https://assets4.lottiefiles.com/packages/lf20_lk80fpsm.json',
  ],
  [
    'https://assets4.lottiefiles.com/packages/lf20_p8bfn5to.json',
    'https://assets8.lottiefiles.com/packages/lf20_j3UXNf.json',
    'https://assets2.lottiefiles.com/packages/lf20_rwq6ciql.json',
  ],
  [
    'https://assets2.lottiefiles.com/packages/lf20_uu0x8lqv.json',
    'https://assets1.lottiefiles.com/packages/lf20_V9t630.json',
    'https://assets8.lottiefiles.com/packages/lf20_atippmse.json',
  ],
  [
    'https://assets5.lottiefiles.com/packages/lf20_w98qte06.json',
    'https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json',
    'https://assets6.lottiefiles.com/packages/lf20_ydo1amjm.json',
  ],
] as const;

const ImageUrls = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
] as const;

const HeavyUIScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        nestedScrollEnabled
      >
        <View style={styles.section}>
          <Text style={styles.title}>Video</Text>

          <View style={styles.card}>
            <View style={styles.mediaWrapper}>
              <WebView
                originWhitelist={['*']}
                source={{ html: videoHtml }}
                style={styles.media}
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled
                domStorageEnabled
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Lottie Animations</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            indicatorStyle="black"
            nestedScrollEnabled
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            {LottieAnimationURLs.map((urls, index) => (
              <ScrollView
                key={index}
                showsVerticalScrollIndicator={true}
                indicatorStyle="black"
                nestedScrollEnabled
                contentContainerStyle={styles.verticalScrollContainer}
                style={styles.verticalScroll}
              >
                {urls.map((url, idx) => (
                  <View key={idx} style={styles.horizontalCard}>
                    <RemoteLottie url={url} style={styles.lottie} />
                  </View>
                ))}
              </ScrollView>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Images</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            indicatorStyle="black"
            nestedScrollEnabled
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            {ImageUrls.map((url, index) => (
              <View key={index} style={styles.horizontalCard}>
                <Image source={{ uri: url }} style={styles.image} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  mediaWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  horizontalScrollContainer: {
    paddingHorizontal: 4,
    gap: 14,
  },
  verticalScroll: {
    marginRight: 16,
    maxHeight: 320,
  },
  verticalScrollContainer: {
    paddingVertical: 4,
  },
  horizontalCard: {
    width: 150,
    height: 150,
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 120,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  media: {
    flex: 1,
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#E5E7EB',
  },
});

export default HeavyUIScreen;
