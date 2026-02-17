'use client';

import { useNews } from '../../../../../src/features/news/useNews';
import NewsListWeb from '@web/widgets/news/NewsListWeb';
import { useNewsUrlSync } from '@web/web/hooks/useNewsUrlSync';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useCallback } from 'react';

export default function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlQuery = searchParams.get('query') ?? '';
  const urlCategory = searchParams.get('category') ?? 'general';
  const urlSort = (searchParams.get('sort') as 'publishedAt' | 'relevancy') ?? 'publishedAt';
  const initializedRef = useRef(false);

  type NewsState = ReturnType<typeof useNews> & { error?: unknown; retry?: () => void };
  const newsState = useNews() as unknown as NewsState;

  const {
    news,
    loading,
    error,
    retry,
    loadMore,
    onSearch,
    category,
    changeCategory,
    sort,
    changeSort,
    query,
  } = newsState;

  const errorMessage: string | null | undefined = typeof error === 'string' ? error : error ? String(error) : undefined;

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    onSearch(urlQuery);
    changeCategory(urlCategory);
    changeSort(urlSort);
  }, [urlQuery, urlCategory, urlSort, onSearch, changeCategory, changeSort]);

  useNewsUrlSync({
    query,
    category,
    sort,
    onSearch,
    onCategoryChange: changeCategory,
    onSortChange: changeSort,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const first = entries[0];
    if (!first.isIntersecting) return;
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '300px',
    });

    const current = sentinelRef.current;
    if (current) observerRef.current.observe(current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleIntersect]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !observerRef.current) return;
    observerRef.current.unobserve(node);
    observerRef.current.observe(node);
  }, [news.length]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <main className="news-page">
      <section className="news-list-section">
        <NewsListWeb
          news={news}
          loading={loading}
          error={errorMessage}
          onRetry={retry}
          onSearch={onSearch}
          category={category}
          onCategoryChange={changeCategory}
          sort={sort}
          onSortChange={changeSort}
          onLoadMore={loadMore}
        />
      </section>

      <div ref={sentinelRef} className="sentinel" />

      <style jsx>{`
        .news-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .news-list-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .sentinel {
          height: 1px;
        }
        .loading {
          padding: 20px;
          text-align: center;
          font-size: 1.2rem;
          color: #555;
        }
      `}</style>
    </main>
  );
}