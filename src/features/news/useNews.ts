import { useEffect, useState, useRef } from 'react';
import { fetchNews } from '@/shared/api/newsApi';
import { Article } from '@/entities/news/model/types';

export function useNews() {
  const [news, setNews] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [sort, setSort] = useState<'publishedAt' | 'relevancy'>('publishedAt');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFetching = useRef(false);
  const hasMore = useRef(true);
  const pageRef = useRef(1);
  // const cache = useRef<Record<string, Article[]>>({}); // per-filter page 1 cache only
  const abortRef = useRef<AbortController | null>(null);
  // const currentKeyRef = useRef('');

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(id);
  }, [query]);

  const loadNews = async (
    pageToLoad = 1,
    append = false,
    q = query,
    c = category,
    s = sort
  ) => {
    if (isFetching.current) return;
    // cancel previous request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    // const baseKey = `${q}_${c}_${s}`;
    // if (currentKeyRef.current !== baseKey && pageToLoad === 1) {
    //   setNews([]);
    //   hasMore.current = true;
    // }
    // currentKeyRef.current = baseKey;
    isFetching.current = true;
    if (pageToLoad === 1) {
      hasMore.current = true;
      setLoading(true);
    }
    try {
      const normalizedQuery = q && q.trim().length > 0 ? q : undefined;
      const normalizedCategory = normalizedQuery ? undefined : c;
      const data = await fetchNews({ page: pageToLoad, query: normalizedQuery, category: normalizedCategory, sort: s, signal: controller.signal } as any);
      const articles = Array.isArray((data as any)?.articles) ? (data as any).articles : (Array.isArray(data) ? data : []);
      const mapped = articles.map((a: any): Article => ({
        id: a.id ?? a.url,
        title: a.title ?? '',
        url: a.url,
        description: a.description ?? a.content ?? '',
        image: a.image ?? a.urlToImage ?? '',
        date: a.date ?? a.publishedAt ?? '',
        source: a.source?.name ?? a.source ?? '',
      }));

      if (pageToLoad === 1) {
        hasMore.current = mapped.length > 0;
        setNews(mapped);
        setPage(1);
        pageRef.current = 1;
      } else {
        if (mapped.length === 0) {
          hasMore.current = false;
        } else {
          setNews(prev => [...prev, ...mapped]);
          pageRef.current = pageToLoad;
          setPage(pageToLoad);
        }
      }
    } catch (e) {
      if ((e as any)?.name === 'AbortError') return;
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
    setLoading(true);
    loadNews(1, false, debouncedQuery, category, sort);
  }, [debouncedQuery, category, sort]);

  const onRefresh = () => {
    setRefreshing(true);
    loadNews(1, false, debouncedQuery, category, sort);
  };

  const loadMore = () => {
    if (loadingMore || refreshing) return;
    if (isFetching.current) return;
    if (!hasMore.current) return;
    if (news.length === 0) return;

    const nextPage = pageRef.current + 1;

    setLoadingMore(true);
    loadNews(nextPage, true, debouncedQuery, category, sort);
  };

  const onSearch = (text: string) => {
    setQuery(text);
  };

  const changeCategory = (newCategory: string) => {
    setCategory(newCategory);
    setNews([]);
    hasMore.current = true;
    pageRef.current = 1;
    setPage(1);
  };

  const changeSort = (newSort: 'publishedAt' | 'relevancy') => {
    setSort(newSort);
    setNews([]);
    hasMore.current = true;
    pageRef.current = 1;
    setPage(1);
  };

  return {
    query,
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