import { View, Button, Text } from 'react-native';
import { useFiles } from '@/features/files/useFiles';

export default function FileControls() {
  const { fileName, pickFile, downloadFile } = useFiles();

  return (
    <View style={{ padding: 16 }}>
      <Button title="Pick file" onPress={pickFile} />

      <View style={{ height: 12 }} />

      <Button title="Download file" onPress={downloadFile} />

      {fileName && (
        <Text style={{ marginTop: 16 }}>
          Selected file: {fileName}
        </Text>
      )}
    </View>
  );
}