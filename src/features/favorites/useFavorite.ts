import { useEffect, useState } from 'react';
import { Article } from '@/entities/news/model/types';
import { isFavorite, toggleFavorite } from '@/shared/storage/favoritesStorage';

export function useFavorite(article: Article) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check();
  }, [article.id]);

  const check = async () => {
    const result = await isFavorite(article.id);
    setFavorite(result);
    setLoading(false);
  };

  const onToggle = async () => {
    const result = await toggleFavorite(article);
    setFavorite(result);
  };

  return {
    isFavorite: favorite,
    toggleFavorite: onToggle,
    loading,
  };
}