import { View, TouchableOpacity, Text } from 'react-native';

type Props = {
  sort: 'publishedAt' | 'relevancy';
  onChange: (sort: 'publishedAt' | 'relevancy') => void;
};

export default function SortTabs({ sort, onChange }: Props) {
  const options = [
    { label: 'Newest', value: 'publishedAt' as const },
    { label: 'Relevant', value: 'relevancy' as const },
  ];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 8 }}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onChange(opt.value)}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 20,
            backgroundColor: sort === opt.value ? '#007AFF' : '#eee',
          }}
        >
          <Text style={{ color: sort === opt.value ? '#fff' : '#000' }}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}