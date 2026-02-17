import { Text, TouchableOpacity, View, Image } from 'react-native';
import { NewsArticle } from '../api/newsApi';

type Props = {
  article: NewsArticle;
  onPress: () => void;
};

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) +
    ' • ' +
    d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

const getSource = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
};

export default function NewsCard({ article, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: 14,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e5e5e5',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        {article.image ? (
          <Image
            source={{ uri: article.image }}
            style={{ width: 110, height: 110 }}
            resizeMode="cover"
          />
        ) : null}

        <View style={{ flex: 1, padding: 12 }}>
          <Text numberOfLines={2} style={{ fontSize: 15, fontWeight: '600' }}>
            {article.title}
          </Text>

          <Text numberOfLines={2} style={{ color: '#666', marginTop: 6 }}>
            {article.description}
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#888' }}>
              {getSource(article.url)}
            </Text>
            <Text style={{ fontSize: 12, color: '#888' }}>  •  </Text>
            <Text style={{ fontSize: 12, color: '#888' }}>
              {formatDate(article.date)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}