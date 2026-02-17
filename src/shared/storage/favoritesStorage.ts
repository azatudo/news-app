import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '@/entities/news/model/types';

const KEY = 'favorites';

export async function getFavorites(): Promise<Article[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function isFavorite(id: string): Promise<boolean> {
  const list = await getFavorites();
  return list.some(a => a.id === id);
}

export async function toggleFavorite(article: Article): Promise<boolean> {
  const list = await getFavorites();

  const exists = list.some(a => a.id === article.id);
  const updated = exists
    ? list.filter(a => a.id !== article.id)
    : [...list, article];

  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return !exists;
}