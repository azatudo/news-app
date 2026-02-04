import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import NewsListScreen from './screens/NewsListScreen';
import ArticleScreen from './screens/ArticleScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AuthScreen from './screens/AuthScreen';

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

  useEffect(() => {
    const registerForPush = async () => {
      if (!Device.isDevice) return;

      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (status !== 'granted') {
        const permission = await Notifications.requestPermissionsAsync();
        finalStatus = permission.status;
      }

      if (finalStatus !== 'granted') return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log('PUSH TOKEN:', token.data);
    };

    registerForPush();
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