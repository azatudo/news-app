import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { fetchNews, NewsArticle } from '../services/newsApi';

export default function NewsListScreen() {
  const navigation = useNavigation<any>();

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const loadNews = async (
    pageToLoad = 1,
    append = false,
    q = query
  ) => {
    try {
      setError(false);
      const data = await fetchNews(pageToLoad, q);
      setNews((prev) => (append ? [...prev, ...data] : data));
      setPage(pageToLoad);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews(1);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadNews(1, false);
  };

  const loadMore = () => {
    if (loadingMore || refreshing) return;
    setLoadingMore(true);
    loadNews(page + 1, true);
  };

  const onSearch = () => {
    setLoading(true);
    loadNews(1, false, query);
  };

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New article available',
        body: 'Check the latest news',
      },
      trigger: null,
    });
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (error && news.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ marginBottom: 12 }}>Error loading news</Text>
        <Button title="Retry" onPress={() => loadNews(1)} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <TextInput
          placeholder="Search news"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={onSearch}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 8,
            marginBottom: 8,
          }}
        />
        <Button title="Test notification" onPress={sendTestNotification} />
      </View>

      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
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
    </View>
  );
}