import React, { useRef } from 'react';
import { View, Text, FlatList, StyleSheet, findNodeHandle } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';

const DATA = Array.from({ length: 100 }, (_, i) => ({
  id: i.toString(),
  title: `Item #${i}`,
}));

const refs = DATA.map(() => React.createRef<View>());

const CardView = React.forwardRef(({ title }: { title: string }, ref) => (
  <View ref={ref} style={styles.card}>
    <Text style={styles.cardText}>{title}</Text>
  </View>
));

const FlatListScreen: React.FC = () => {
  const lastSensitiveTagsRef = useRef<number[]>([]);

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    const sensitiveTags: number[] = [];
    viewableItems.forEach(({ index }) => {
      if (index % 2 === 0 && refs[index]?.current) {
        const tag = findNodeHandle(refs[index].current);
        if (tag) sensitiveTags.push(tag);
      }
    });

    // Determine views to unmark and mark based on visibility changes
    const currentlyMarked = lastSensitiveTagsRef.current;
    const toUnmark = currentlyMarked.filter(
      (tag) => !sensitiveTags.includes(tag)
    );
    const toMark = sensitiveTags.filter(
      (tag) => !currentlyMarked.includes(tag)
    );

    // Unmark views that are no longer visible or will be remarked
    if (toUnmark.length > 0) {
      DevRev.unmarkSensitiveViews(toUnmark);
    }

    // Mark newly visible sensitive views
    if (toMark.length > 0) {
      DevRev.markSensitiveViews(toMark);
    }

    // Update the record of currently marked sensitive views
    // This includes views that remained visible and newly marked views
    lastSensitiveTagsRef.current = sensitiveTags.filter(
      (tag) => toUnmark.indexOf(tag) === -1 || toMark.indexOf(tag) !== -1
    );
  }, []);

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <CardView ref={refs[index]} title={item.title} />
      )}
      contentContainerStyle={styles.list}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    padding: 16,
    marginBottom: 12,
  },
  cardText: { fontSize: 16, color: '#333' },
});

export default FlatListScreen;
