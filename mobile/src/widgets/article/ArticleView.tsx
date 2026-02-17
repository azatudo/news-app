import { View, Text, Button, Platform, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Article } from '@/entities/news/model/types';
import { useFavorites } from '@/features/favorites/useFavorites';
import { useState, useEffect } from 'react';

type Props = {
  article: Article;
};

function getSource(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
}

export default function ArticleView({ article }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(article);
  const [openWeb, setOpenWeb] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const imageUriRaw = (article as any).image ?? (article as any).urlToImage;
  const domain = article.url ? getSource(article.url) : '';

  const primaryImage = imageUriRaw?.replace('http://', 'https://');
  const fallbackLogo = domain ? `https://logo.clearbit.com/${domain}` : undefined;

  const [currentImage, setCurrentImage] = useState<string | undefined>(primaryImage || fallbackLogo);

  const formatDate = (value?: string) => {
    if (!value) return '';
    try {
      const d = new Date(value);
      return d.toLocaleString();
    } catch {
      return value;
    }
  };

  useEffect(() => {
    setUsedFallback(false);
    setImgError(false);
    setCurrentImage(primaryImage || fallbackLogo);
  }, [primaryImage, fallbackLogo]);

  if (Platform.OS !== 'web' && openWeb) {
    return <WebView source={{ uri: article.url }} startInLoadingState />;
  }

  return (
    <View style={{ padding: 16 }}>
      {currentImage && !imgError && (
        <Image
          key={currentImage}
          source={{ uri: currentImage }}
          onError={() => {
            if (!usedFallback && fallbackLogo && currentImage !== fallbackLogo) {
              setUsedFallback(true);
              setCurrentImage(fallbackLogo);
              setImgError(false);
            } else {
              setImgError(true);
            }
          }}
          style={{
            width: '100%',
            height: 220,
            borderRadius: 12,
            marginBottom: 12,
            backgroundColor: '#eee'
          }}
          resizeMode="cover"
        />
      )}
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
        {article.title}
      </Text>

      {!!article.description && (
        <Text style={{ marginBottom: 8 }}>
          {article.description}
        </Text>
      )}

      {!!article.date && (
        <Text style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>
          {formatDate(article.date)}
        </Text>
      )}

      <Text style={{ fontSize: 12, color: '#555', marginBottom: 16 }}>
        {getSource(article.url)}
      </Text>

      <Button
        title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        onPress={() => toggleFavorite(article)}
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