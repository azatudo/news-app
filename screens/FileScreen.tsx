import { View, Text, Button, Alert } from 'react-native';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';

export default function FileScreen() {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      setFileName(file.name);

      Alert.alert('File picked', file.name);
    } catch {
      Alert.alert('Error picking file');
    }
  };

  const downloadFile = async () => {
    try {
      const url =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

      const target =
        FileSystem.documentDirectory + 'downloaded-file.pdf';

      const res = await FileSystem.downloadAsync(url, target);

      Alert.alert('File downloaded', res.uri);
    } catch (e) {
      Alert.alert('Download error');
    }
  };

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