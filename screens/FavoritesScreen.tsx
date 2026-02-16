import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { Article } from '@/entities/news/model/types';
import { getFavorites } from '@/shared/storage/favoritesStorage';
import NewsCard from '@/entities/news/ui/NewsCard';

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getFavorites();
    setFavorites(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (!favorites.length) {
    return (
      <View style={{ padding: 16 }}>
        <Text>No favorites yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <NewsCard
          article={{
            ...item,
            description: item.description ?? '',
            date: item.date ?? '',
          }}
          onPress={() =>
            navigation.navigate('Article', {
              id: item.id,
              title: item.title,
              description: item.description,
              date: item.date,
              url: item.url,
            })
          }
        />
      )}
    />
  );
}