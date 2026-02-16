import { useEffect, useState } from 'react';
import { fetchNews } from '@/entities/news/api/newsApi';
import { Article } from '@/entities/news/model/types';

export function useNews() {
  const [news, setNews] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async (
    pageToLoad = 1,
    append = false,
    q = query,
    c = category
  ) => {
    try {
      const data = await fetchNews(pageToLoad, q, c);
      setNews(prev => (append ? [...prev, ...data] : data));
      setPage(pageToLoad);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews(1, false, '', category);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadNews(1, false, query, category);
  };

  const loadMore = () => {
    if (loadingMore || refreshing) return;
    setLoadingMore(true);
    loadNews(page + 1, true, query, category);
  };

  const onSearch = (text: string) => {
    setQuery(text);
    setLoading(true);
    loadNews(1, false, text, category);
  };

  const changeCategory = (newCategory: string) => {
    setCategory(newCategory);
    setLoading(true);
    loadNews(1, false, query, newCategory);
  };

  return {
    news,
    loading,
    refreshing,
    loadingMore,
    onRefresh,
    loadMore,
    onSearch,
    category,
    changeCategory,
  };
}