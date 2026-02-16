import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '@/entities/news/model/types';

const KEY = 'favorites';

export async function getFavorites(): Promise<Article[]> {
  const stored = await AsyncStorage.getItem(KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function saveFavorites(favorites: Article[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(favorites));
}

export async function isFavorite(id: string) {
  const favorites = await getFavorites();
  return favorites.some(a => a.id === id);
}

export async function toggleFavorite(article: Article) {
  const favorites = await getFavorites();

  const exists = favorites.some(a => a.id === article.id);

  const updated = exists
    ? favorites.filter(a => a.id !== article.id)
    : [...favorites, article];

  await saveFavorites(updated);
  return !exists;
}