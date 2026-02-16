import { useEffect, useState, useRef } from 'react';
import { fetchNews } from '@/entities/news/api/newsApi';
import { Article } from '@/entities/news/model/types';

export function useNews() {
  const [news, setNews] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [sort, setSort] = useState<'publishedAt' | 'relevancy'>('publishedAt');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFetching = useRef(false);
  const hasMore = useRef(true);

  const loadNews = async (
    pageToLoad = 1,
    append = false,
    q = query,
    c = category,
    s = sort
  ) => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const data = await fetchNews(pageToLoad, q, c, s);

      // reset pagination when reloading first page
      if (pageToLoad === 1) hasMore.current = true;

      if (!data || data.length === 0) {
        hasMore.current = false;
      }

      setNews(prev => (append ? [...prev, ...data] : data));
      setPage(pageToLoad);
    } catch (e) {
      hasMore.current = false;
      setNews(prev => (append ? prev : []));
    } finally {
      isFetching.current = false;
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      setLoading(true);
      try {
        await loadNews(1, false, '', category, sort);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadNews(1, false, query, category, sort);
  };

  const loadMore = () => {
    if (loadingMore || refreshing || loading) return;
    if (isFetching.current) return;
    if (!hasMore.current) return;
    if (news.length === 0) return;

    setLoadingMore(true);
    loadNews(page + 1, true, query, category, sort);
  };

  const onSearch = (text: string) => {
    setQuery(text);
    setLoading(true);
    loadNews(1, false, text, category, sort);
  };

  const changeCategory = (newCategory: string) => {
    setCategory(newCategory);
    setLoading(true);
    loadNews(1, false, query, newCategory, sort);
  };

  const changeSort = (newSort: 'publishedAt' | 'relevancy') => {
    setSort(newSort);
    setLoading(true);
    loadNews(1, false, query, category, newSort);
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
    sort,
    changeSort,
  };
}