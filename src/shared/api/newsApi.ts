const BASE_URL = 'https://newsapi.org/v2';

export type FetchNewsParams = {
  page?: number;
  query?: string;
  category?: string;
  sort?: 'publishedAt' | 'relevancy';
};

function isWeb() {
  return (
    typeof window !== 'undefined' &&
    !(typeof navigator !== 'undefined' && navigator.product === 'ReactNative')
  );
}

async function fetchFromBackend(params: FetchNewsParams) {
  const page = String(params.page ?? 1);
  const hasQuery = params.query !== undefined;

  const search = new URLSearchParams({ page });

  if (hasQuery) {
    search.set('query', params.query!);
    search.set('sort', params.sort ?? 'publishedAt');
  } else {
    search.set('category', params.category ?? 'general');
  }

  const res = await fetch(`/api/news?${search.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Backend fetch failed');
  return res.json();
}

async function fetchDirect(params: FetchNewsParams) {
  const API_KEY = (globalThis as any)?.process?.env?.EXPO_PUBLIC_NEWS_API_KEY ?? '';
  if (!API_KEY) throw new Error('Missing EXPO_PUBLIC_NEWS_API_KEY');

  const page = params.page ?? 1;
  const hasQuery = params.query !== undefined;

  let url = '';

  if (hasQuery) {
    // SEARCH MODE -> everything endpoint (supports sort)
    url = `${BASE_URL}/everything?q=${encodeURIComponent(params.query!)}&page=${page}&sortBy=${params.sort ?? 'publishedAt'}&language=en&apiKey=${API_KEY}`;
  } else {
    // CATEGORY MODE -> top-headlines endpoint (real categories)
    const category = params.category ?? 'general';
    url = `${BASE_URL}/top-headlines?category=${category}&page=${page}&language=en&apiKey=${API_KEY}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('NewsAPI request failed');
  return res.json();
}

export async function fetchNews(params: FetchNewsParams) {
  const data = isWeb()
    ? await fetchFromBackend(params)
    : await fetchDirect(params);

  return (data.articles ?? []).map((a: any) => ({
    id: a.url,
    title: a.title ?? '',
    description: a.description ?? '',
    date: a.publishedAt ?? '',
    url: a.url,
    image: a.urlToImage ?? null,
    source: a.source?.name ?? '',
  }));
}