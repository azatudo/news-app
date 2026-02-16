import { View, Text, Button, Alert } from 'react-native';

import { loginWithBiometry } from '@/features/auth/useBiometry';

export default function AuthScreen({ onSuccess }: { onSuccess: () => void }) {
  const authenticate = async () => {
    const ok = await loginWithBiometry();
    if (ok) onSuccess();
    else Alert.alert('Authentication failed');
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