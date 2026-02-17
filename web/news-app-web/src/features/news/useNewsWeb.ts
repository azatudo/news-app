'use client';

import { useNews } from '@/features/news/useNews';

export function useNewsWeb() {
  const newsState = useNews();

  return {
    news: newsState.news,
    loading: newsState.loading,
    refreshing: newsState.refreshing,
    loadingMore: newsState.loadingMore,

    query: newsState.query,
    onSearch: newsState.onSearch,

    category: newsState.category,
    onCategoryChange: newsState.changeCategory,

    sort: newsState.sort,
    onSortChange: newsState.changeSort,

    onRefresh: newsState.onRefresh,
    onLoadMore: newsState.loadMore,
  };
}