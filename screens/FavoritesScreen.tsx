import { View, Text } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>
        Favorites
      </Text>

      <Text>
        Saved articles will be here.
      </Text>
    </View>
  );
}