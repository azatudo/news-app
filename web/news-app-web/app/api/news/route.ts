import { NextResponse } from 'next/server';

const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.NEWS_API_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page') ?? '1';
  const query = searchParams.get('query') ?? '';
  const category = searchParams.get('category') ?? 'general';
  const sort = searchParams.get('sort') ?? 'publishedAt';

  const url = query
    ? `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&sortBy=${sort}&apiKey=${API_KEY}`
    : `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&apiKey=${API_KEY}`;

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  return NextResponse.json(data);
}