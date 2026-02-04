import { View, Text, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen({ onSuccess }: { onSuccess: () => void }) {
  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometry not available');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Face ID',
    });

    if (result.success) {
      await AsyncStorage.setItem('isAuthenticated', 'true');
      onSuccess();
    } else {
      Alert.alert('Authentication failed');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 16 }}>
        Authenticate to continue
      </Text>
      <Button title="Login with Face ID" onPress={authenticate} />
    </View>
  );
}