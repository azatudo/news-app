import { Text, TouchableOpacity, View, Image } from 'react-native';
import { NewsArticle } from '../api/newsApi';

type Props = {
  article: NewsArticle;
  onPress: () => void;
};

export default function NewsCard({ article, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
      }}
    >
      {article.image ? (
        <Image
          source={{ uri: article.image }}
          style={{
            width: '100%',
            height: 160,
            borderRadius: 6,
            marginBottom: 8,
          }}
        />
      ) : null}

      <Text style={{ fontSize: 16, fontWeight: '600' }}>
        {article.title}
      </Text>

      <Text style={{ color: '#555', marginTop: 4 }}>
        {article.description}
      </Text>

      <Text style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
        {new Date(article.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
}