import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Article } from '@/entities/news/model/types';
import { getFavorites } from '@/shared/storage/favoritesStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getFavorites();
    setFavorites(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return { favorites, loading };
}