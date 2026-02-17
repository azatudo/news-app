import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '@/features/favorites/useFavorites';
import NewsCard from '@/entities/news/ui/NewsCard';

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const { favorites, loading } = useFavorites();

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