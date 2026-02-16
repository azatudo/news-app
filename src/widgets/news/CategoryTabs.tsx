import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

const CATEGORIES = [
  'General',
  'Business',
  'Technology',
  'Sports',
  'Health',
  'Science',
  'Entertainment',
];

type Props = {
  current: string;
  onChange: (category: string) => void;
};

export default function CategoryTabs({ current, onChange }: Props) {
  return (
    <View
      style={{
        height: 42,
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        paddingVertical: 4,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = current.toLowerCase() === cat.toLowerCase();
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onChange(cat.toLowerCase())}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                marginRight: 8,
                borderRadius: 25,
                backgroundColor: isActive ? '#007AFF' : '#E0E0E0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: isActive ? 0.3 : 0,
                shadowRadius: 2,
                elevation: isActive ? 2 : 0, // для Android
              }}
            >
              <Text
                style={{
                  color: isActive ? '#fff' : '#333',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: 13,
                  textTransform: 'capitalize',
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}