import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ArticleScreen() {
  const route = useRoute<any>();
  const { title, description, date } = route.params || {};

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
        {title}
      </Text>

      <Text style={{ marginBottom: 8 }}>
        {description}
      </Text>

      <Text style={{ fontSize: 12, color: '#888' }}>
        {date}
      </Text>
    </View>
  );
}