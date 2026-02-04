import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsListScreen from './screens/NewsListScreen';
import ArticleScreen from './screens/ArticleScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="News"
          component={NewsListScreen}
          options={{ title: 'News' }}
        />
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={{ title: 'Article' }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Favorites' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}