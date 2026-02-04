import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
  const navigation = useNavigation();

  return (
    <FlatList
      data={mockNews}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Article' as never)}
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

          <Text style={{ marginTop: 4, color: '#555' }}>
            {item.description}
          </Text>

          <Text style={{ marginTop: 6, fontSize: 12, color: '#888' }}>
            {item.date}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}