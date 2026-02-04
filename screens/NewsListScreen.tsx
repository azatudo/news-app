import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchNews, NewsArticle } from '../services/newsApi';

export default function NewsListScreen() {
  const navigation = useNavigation<any>();

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async () => {
    try {
      setError(false);
      const data = await fetchNews();
      setNews(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (error) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ marginBottom: 12 }}>Error loading news</Text>
        <Button title="Retry" onPress={loadNews} />
      </View>
    );
  }

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Article', {
              id: item.id,
              title: item.title,
              description: item.description,
              date: item.date,
              url: item.url,
            })
          }
          style={{
            padding: 12,
            marginBottom: 12,
            backgroundColor: '#f2f2f2',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            {item.title}
          </Text>
          <Text style={{ color: '#555' }}>{item.description}</Text>
          <Text style={{ fontSize: 12, color: '#888' }}>{item.date}</Text>
        </TouchableOpacity>
      )}
    />
  );
}