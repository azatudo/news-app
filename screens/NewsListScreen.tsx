import { View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNews } from '@/features/news/useNews';
import NewsCard from '@/entities/news/ui/NewsCard';
import NewsSearch from '@/widgets/news/NewsSearch';

export default function NewsListScreen() {
  const navigation = useNavigation<any>();

  const {
    news,
    loading,
    refreshing,
    loadingMore,
    onRefresh,
    loadMore,
    onSearch,
  } = useNews();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <NewsSearch onSearch={onSearch} />

      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
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
    </View>
  );
}