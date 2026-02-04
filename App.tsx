import { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsListScreen from './screens/NewsListScreen';
import ArticleScreen from './screens/ArticleScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      setAuthorized(true);
      setLoading(false);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to continue',
    });

    setAuthorized(result.success);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!authorized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <Text style={{ textAlign: 'center', marginBottom: 16 }}>
          Authentication required
        </Text>
        <Button title="Try again" onPress={authenticate} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="News" component={NewsListScreen} />
        <Stack.Screen name="Article" component={ArticleScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen
          name="Logout"
          component={() => (
            <View style={{ padding: 16 }}>
              <Button title="Logout" onPress={() => setAuthorized(false)} />
            </View>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}