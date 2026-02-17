import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Platform, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import NewsListScreen from '@mobile/screens/NewsList';
import ArticleScreen from '@mobile/screens/Article';
import FavoritesScreen from '@mobile/screens/Favorites';
import AuthScreen from '@mobile/screens/Auth';
import FileScreen from '@mobile/screens/Files';
import { useNotifications } from '@mobile/features/notifications/useNotifications';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Tabs({ onLogout }: { onLogout: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => <Button title="Logout" onPress={onLogout} />,
      }}
    >
      <Tab.Screen
        name="NewsTab"
        component={NewsListScreen}
        options={{ title: 'News' }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
      <Tab.Screen
        name="FilesTab"
        component={FileScreen}
        options={{ title: 'Files' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    Platform.OS === 'web' ? true : null
  );

  useNotifications();

  useEffect(() => {
    const checkAuth = async () => {
      if (Platform.OS === 'web') {
        setIsAuthenticated(true);
        return;
      }

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
      <Stack.Navigator key={isAuthenticated ? 'app' : 'auth'}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" options={{ headerShown: false }}>
            {() => <AuthScreen onSuccess={() => setIsAuthenticated(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
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