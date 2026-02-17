import { useState } from 'react';
import { Alert } from 'react-native';
import { pickFileFromDevice } from '@mobile/files/pickFile';
import { downloadDummyFile } from '@mobile/files/downloadFile';

export function useFiles() {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const file = await pickFileFromDevice();
      if (!file) return;

      setFileName(file.name);
      Alert.alert('File picked', file.name);
    } catch {
      Alert.alert('Error picking file');
    }
  };

  const downloadFile = async () => {
    try {
      const uri = await downloadDummyFile();
      Alert.alert('File downloaded', uri);
    } catch {
      Alert.alert('Download error');
    }
  };

  return {
    fileName,
    pickFile,
    downloadFile,
  };
}