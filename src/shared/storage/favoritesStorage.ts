import { Article } from '@/entities/news/model/types';

// allow conditional native require in universal code
declare const require: any;

const KEY = 'favorites';

// --- platform helpers ---
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

async function getRaw(): Promise<string | null> {
  if (isWeb) return localStorage.getItem(KEY);
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return AsyncStorage.getItem(KEY);
  } catch {
    return null;
  }
}

async function setRaw(value: string) {
  if (isWeb) {
    localStorage.setItem(KEY, value);
    return;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(KEY, value);
  } catch {
    // ignore on web
  }
}

// --- public api ---
export async function getFavorites(): Promise<Article[]> {
  const raw = await getRaw();
  return raw ? JSON.parse(raw) : [];
}

export async function isFavorite(id: string): Promise<boolean> {
  const list = await getFavorites();
  return list.some(a => a.url === id || (a as any).id === id);
}

export async function toggleFavorite(article: Article): Promise<boolean> {
  const list = await getFavorites();

  const exists = list.some(a => a.url === article.url || (a as any).id === (article as any).id);
  const updated = exists
    ? list.filter(a => a.url !== article.url && (a as any).id !== (article as any).id)
    : [article, ...list];

  await setRaw(JSON.stringify(updated));
  return !exists;
}