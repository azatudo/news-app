import { View, TextInput } from 'react-native';
import { useState } from 'react';

type Props = {
  onSearch: (text: string) => void;
};

export default function NewsSearch({ onSearch }: Props) {
  const [value, setValue] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Search news"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onSearch(value)}
        returnKeyType="search"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
        }}
      />
    </View>
  );
}