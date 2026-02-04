import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    setFavorites(stored ? JSON.parse(stored) : []);
  };

  const removeFavorite = async (id: string) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('isAuthenticated');
    onLogout();
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Button title="Logout" onPress={logout} />
      </View>

      {favorites.length === 0 ? (
        <View style={{ padding: 16 }}>
          <Text>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 12,
                padding: 12,
                backgroundColor: '#f2f2f2',
                borderRadius: 8,
              }}
            >
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
              >
                <Text style={{ fontWeight: '600' }}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
                  {item.date}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => removeFavorite(item.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  paddingVertical: 8,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Remove from favorites
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}