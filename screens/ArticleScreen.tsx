import { View, Text } from 'react-native';

export default function ArticleScreen() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>
        Article screen
      </Text>

      <Text>
        Here will be article content and WebView later.
      </Text>
    </View>
  );
}