import { View, Text, Button, Platform, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArticleScreen() {
  const route = useRoute<any>();
  const { id, title, description, date, url } = route.params;
  const [showWebView, setShowWebView] = useState(false);

  const addToFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      const favorites = stored ? JSON.parse(stored) : [];

      const exists = favorites.some((item: any) => item.id === id);
      if (exists) {
        Alert.alert('Already in favorites');
        return;
      }

      const updated = [
        ...favorites,
        { id, title, description, date, url },
      ];

      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      Alert.alert('Added to favorites');
    } catch {
      Alert.alert('Error saving favorite');
    }
  };

  if (Platform.OS !== 'web' && showWebView) {
    return <WebView source={{ uri: url }} startInLoadingState />;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
        {title}
      </Text>

      <Text style={{ marginBottom: 8 }}>{description}</Text>

      <Text style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>
        {date}
      </Text>

      <Button title="Add to favorites" onPress={addToFavorites} />

      <View style={{ height: 12 }} />

      <Button
        title="Open full article"
        onPress={() => {
          if (Platform.OS === 'web') {
            window.open(url, '_blank');
          } else {
            setShowWebView(true);
          }
        }}
      />
    </View>
  );
}