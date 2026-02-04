import { View, Text, Button, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { WebView } from 'react-native-webview';

const ARTICLE_URL = 'https://example.com';

export default function ArticleScreen() {
  const route = useRoute<any>();
  const { title, description, date } = route.params || {};
  const [showWebView, setShowWebView] = useState(false);

  if (Platform.OS !== 'web' && showWebView) {
    return (
      <WebView
        source={{ uri: ARTICLE_URL }}
        startInLoadingState
      />
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
        {title}
      </Text>

      <Text style={{ marginBottom: 8 }}>
        {description}
      </Text>

      <Text style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>
        {date}
      </Text>

      <Button
        title="Open full article"
        onPress={() => {
          if (Platform.OS === 'web') {
            window.open(ARTICLE_URL, '_blank');
          } else {
            setShowWebView(true);
          }
        }}
      />
    </View>
  );
}