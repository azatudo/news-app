'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Params = {
  query: string;
  category: string;
  sort: 'publishedAt' | 'relevancy';
  onSearch: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onSortChange: (v: 'publishedAt' | 'relevancy') => void;
};

export function useNewsUrlSync({
  query,
  category,
  sort,
  onSearch,
  onCategoryChange,
  onSortChange,
}: Params) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isHydrating = useRef(true);
  const isPushing = useRef(false);
  const lastQs = useRef<string | null>(null);
  const paramsString = searchParams.toString();

  // ---- URL → STATE sync ----
  useEffect(() => {
    const q = searchParams.get('query') ?? '';
    const c = searchParams.get('category') ?? 'general';
    const s = (searchParams.get('sort') as 'publishedAt' | 'relevancy') ?? 'publishedAt';

    // ignore update triggered by our own router.replace
    if (isPushing.current) {
      isPushing.current = false;
      return;
    }

    // first hydration from URL
    if (isHydrating.current) {
      isHydrating.current = false;
      onSearch(q);
      onCategoryChange(c);
      onSortChange(s);
      return;
    }

    if (q !== query) onSearch(q);
    if (c !== category) onCategoryChange(c);
    if (s !== sort) onSortChange(s);
  }, [paramsString]);

  useEffect(() => {
    // don't write URL during initial hydration or while we are handling our own push
    if (isHydrating.current || isPushing.current) return;

    const params = new URLSearchParams();

    if (query !== '') params.set('query', query);
    if (category !== 'general') params.set('category', category);
    if (sort !== 'publishedAt') params.set('sort', sort);

    const qs = params.toString();
    const current = paramsString;

    // prevent flip-flop loops
    if (qs === current || lastQs.current === qs) return;

    const target = qs ? `/?${qs}` : '/';
    lastQs.current = qs;
    isPushing.current = true;
    router.replace(target, { scroll: false });
  }, [query, category, sort, router, paramsString]);
}