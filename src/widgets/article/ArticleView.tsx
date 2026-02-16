import { View, Text, Button, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Article } from '@/entities/news/model/types';
import { useFavorite } from '@/features/favorites/useFavorite';
import { useState } from 'react';

type Props = {
  article: Article;
};

export default function ArticleView({ article }: Props) {
  const { isFavorite, toggleFavorite } = useFavorite(article);
  const [openWeb, setOpenWeb] = useState(false);

  if (Platform.OS !== 'web' && openWeb) {
    return <WebView source={{ uri: article.url }} startInLoadingState />;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
        {article.title}
      </Text>

      {!!article.description && (
        <Text style={{ marginBottom: 8 }}>
          {article.description}
        </Text>
      )}

      {!!article.date && (
        <Text style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>
          {article.date}
        </Text>
      )}

      <Button
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onPress={toggleFavorite}
      />

      <View style={{ height: 12 }} />

      <Button
        title="Open full article"
        onPress={() => {
          if (Platform.OS === 'web') {
            window.open(article.url, '_blank');
          } else {
            setOpenWeb(true);
          }
        }}
      />
    </View>
  );
}