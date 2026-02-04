import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NewsListScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>
        News list
      </Text>

      <Button
        title="Open article"
        onPress={() => navigation.navigate('Article' as never)}
      />

      <View style={{ marginTop: 12 }}>
        <Button
          title="Go to favorites"
          onPress={() => navigation.navigate('Favorites' as never)}
        />
      </View>
    </View>
  );
}