import { useEffect, useState, useCallback } from 'react';
import { Article } from '@/entities/news/model/types';

const STORAGE_KEY = 'favorites_articles_v1';

function readStorage(): Article[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(data: Article[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useFavoritesStore() {
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = readStorage();
    setFavorites(data);
    setLoading(false);
  }, []);

  const isFavorite = useCallback(
    (article: Article) => favorites.some(a => a.url === article.url),
    [favorites]
  );

  const toggleFavorite = useCallback((article: Article) => {
    setFavorites(prev => {
      const exists = prev.some(a => a.url === article.url);
      const next = exists ? prev.filter(a => a.url !== article.url) : [article, ...prev];
      writeStorage(next);
      return next;
    });
  }, []);

  return { favorites, loading, isFavorite, toggleFavorite };
}