import * as DocumentPicker from 'expo-document-picker';

export async function pickFileFromDevice() {
  const result = await DocumentPicker.getDocumentAsync({
    multiple: false,
    copyToCacheDirectory: true,
  });

  if (result.canceled) return null;

  return result.assets[0];
}