import * as FileSystem from 'expo-file-system/legacy';

export async function downloadDummyFile() {
  const url =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  const target = FileSystem.documentDirectory + 'downloaded-file.pdf';

  const res = await FileSystem.downloadAsync(url, target);

  return res.uri;
}