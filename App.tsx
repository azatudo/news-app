import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NewsListScreen from './screens/NewsListScreen';
import ArticleScreen from './screens/ArticleScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({ onLogout }: { onLogout: () => void }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="NewsTab"
        component={NewsListScreen}
        options={{ title: 'News' }}
      />
      <Tab.Screen name="FavoritesTab" options={{ title: 'Favorites' }}>
        {() => <FavoritesScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const value = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(value === 'true');
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" options={{ headerShown: false }}>
            {() => (
              <AuthScreen onSuccess={() => setIsAuthenticated(true)} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
            >
              {() => <Tabs onLogout={() => setIsAuthenticated(false)} />}
            </Stack.Screen>
            <Stack.Screen
              name="Article"
              component={ArticleScreen}
              options={{ title: 'Article' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}