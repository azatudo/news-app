import { FlatList, Text, TouchableOpacity, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockNews = [
  {
    id: '1',
    title: 'First news',
    description: 'Short description of the first news',
    date: '2024-02-01',
  },
  {
    id: '2',
    title: 'Second news',
    description: 'Short description of the second news',
    date: '2024-02-02',
  },
  {
    id: '3',
    title: 'Third news',
    description: 'Short description of the third news',
    date: '2024-02-03',
  },
];

export default function NewsListScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Button
          title="Go to favorites"
          onPress={() => navigation.navigate('Favorites')}
        />
      </View>

      <FlatList
        data={mockNews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Article', {
                id: item.id,
                title: item.title,
                description: item.description,
                date: item.date,
              })
            }
            style={{
              padding: 12,
              marginBottom: 12,
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {item.title}
            </Text>
            <Text>{item.description}</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}