import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

const CATEGORIES = [
  'general',
  'business',
  'technology',
  'sports',
  'health',
  'science',
  'entertainment',
];

type Props = {
  current: string;
  onChange: (category: string) => void;
};

export default function CategoryTabs({ current, onChange }: Props) {
  return (
    <View style={{ height: 50 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => onChange(cat)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              marginHorizontal: 6,
              borderRadius: 20,
              backgroundColor: current === cat ? '#111' : '#eee',
            }}
          >
            <Text style={{ color: current === cat ? '#fff' : '#000' }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}