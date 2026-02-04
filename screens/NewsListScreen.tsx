import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchNews, NewsArticle } from '../services/newsApi';

export default function NewsListScreen() {
  const navigation = useNavigation<any>();

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadNews = async () => {
    try {
      setLoading(true);
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
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{ fontSize: 16, fontWeight: '600' }}
            onPress={() =>
              navigation.navigate('Article', {
                title: item.title,
                description: item.description,
                date: item.publishedAt,
                url: item.url,
              })
            }
          >
            {item.title}
          </Text>

          <Text style={{ color: '#555' }}>{item.description}</Text>
        </View>
      )}
    />
  );
}