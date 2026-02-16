import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useFavorite(article: any) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    const favorites = stored ? JSON.parse(stored) : [];
    setIsFavorite(favorites.some((item: any) => item.id === article.id));
  };

  const toggleFavorite = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    let favorites = stored ? JSON.parse(stored) : [];

    if (favorites.some((item: any) => item.id === article.id)) {
      favorites = favorites.filter((item: any) => item.id !== article.id);
      setIsFavorite(false);
    } else {
      favorites.push(article);
      setIsFavorite(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return { isFavorite, toggleFavorite };
}