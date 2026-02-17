'use client';

import type { Article } from '@/entities/news/model/types';
import NewsCardWeb from '@web/entities/news/NewsCardWeb';
import { useRouter } from 'next/navigation';

type Props = {
  news: Article[];
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
  onSearch: (text: string) => void;
  category: string;
  onCategoryChange: (newCategory: string) => void;
  sort: 'publishedAt' | 'relevancy';
  onSortChange: (newSort: 'publishedAt' | 'relevancy') => void;
  onLoadMore: () => void;
};

export default function NewsListWeb({
  news,
  loading,
  error,
  onRetry,
  onSearch,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  onLoadMore,
}: Props) {
  const router = useRouter();

  if (error) {
    return (
      <div style={{
        padding: 40,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{ fontSize: 24, fontWeight: '700' }}>
          Failed to load news
        </div>

        <div style={{ color: '#bbb', fontSize: 16 }}>
          Something went wrong. Please try again.
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              marginTop: 20,
              padding: '12px 24px',
              borderRadius: 6,
              border: 'none',
              backgroundColor: '#1e88e5',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: 16,
              boxShadow: '0 4px 12px rgba(30, 136, 229, 0.3)',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1565c0')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1e88e5')}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1200,
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      backgroundColor: '#121212',
    }}>
      {/* Header with title, search and favorites */}
      <header style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: '#fff' }}>News</h1>
        <div style={{ flexGrow: 1, maxWidth: 400, position: 'relative' }}>
          <input
            placeholder="Search news..."
            defaultValue=""
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value.trim();
                onSearch(value);
              }
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1.5px solid #444',
              fontSize: 16,
              outline: 'none',
              boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.1)',
              backgroundColor: '#1e1e1e',
              color: '#fff',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#1e88e5';
              e.currentTarget.style.boxShadow = '0 0 8px rgba(30,136,229,0.6)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#444';
              e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(255,255,255,0.1)';
            }}
            aria-label="Search news"
          />
          <style>{`
            input::placeholder {
              color: #bbb;
            }
          `}</style>
        </div>
        <button
          onClick={() => router.push('/favorites')}
          title="Go to Favorites"
          style={{
            padding: '12px 24px',
            borderRadius: 24,
            border: '2px solid #1e88e5',
            backgroundColor: 'transparent',
            color: '#1e88e5',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 16,
            boxShadow: 'none',
            transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
            whiteSpace: 'nowrap',
          }}
        >
          Favorites
        </button>
      </header>

      {/* Filters and Sorting */}
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, flexGrow: 1 }}>
          {['general','business','technology','sports','health','science','entertainment'].map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              style={{
                padding: '10px 22px',
                borderRadius: 30,
                border: 'none',
                backgroundColor: cat === category ? '#1e88e5' : '#333',
                color: cat === category ? '#fff' : '#bbb',
                fontWeight: cat === category ? '700' : '600',
                cursor: 'pointer',
                textTransform: 'capitalize',
                boxShadow: cat === category ? '0 4px 16px rgba(30,136,229,0.6)' : 'none',
                transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
                flexShrink: 0,
                fontSize: 15,
              }}
              aria-pressed={cat === category}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <button
            onClick={() => onSortChange('publishedAt')}
            style={{
              padding: '10px 26px',
              borderRadius: 30,
              border: 'none',
              backgroundColor: sort === 'publishedAt' ? '#1e88e5' : '#333',
              color: sort === 'publishedAt' ? '#fff' : '#bbb',
              fontWeight: sort === 'publishedAt' ? '700' : '600',
              cursor: 'pointer',
              boxShadow: sort === 'publishedAt' ? '0 4px 16px rgba(30,136,229,0.6)' : 'none',
              transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
              fontSize: 15,
              whiteSpace: 'nowrap',
            }}
            aria-pressed={sort === 'publishedAt'}
          >
            Newest
          </button>
          <button
            onClick={() => onSortChange('relevancy')}
            style={{
              padding: '10px 26px',
              borderRadius: 30,
              border: 'none',
              backgroundColor: sort === 'relevancy' ? '#1e88e5' : '#333',
              color: sort === 'relevancy' ? '#fff' : '#bbb',
              fontWeight: sort === 'relevancy' ? '700' : '600',
              cursor: 'pointer',
              boxShadow: sort === 'relevancy' ? '0 4px 16px rgba(30,136,229,0.6)' : 'none',
              transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
              fontSize: 15,
              whiteSpace: 'nowrap',
            }}
            aria-pressed={sort === 'relevancy'}
          >
            Relevant
          </button>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading && news.length === 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
            marginTop: 8,
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{
              borderRadius: 16,
              backgroundColor: '#222',
              boxShadow: '0 4px 12px rgba(255,255,255,0.05)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              animation: 'pulse 1.6s ease-in-out infinite',
            }}>
              <div style={{
                height: 160,
                borderRadius: 12,
                backgroundColor: '#444',
              }} />
              <div style={{
                height: 20,
                width: '80%',
                borderRadius: 8,
                backgroundColor: '#444',
              }} />
              <div style={{
                height: 16,
                width: '60%',
                borderRadius: 8,
                backgroundColor: '#444',
              }} />
            </div>
          ))}
        </div>
      )}

      {/* News List */}
      {!loading && news.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {news.map((article, index) => (
            <div key={`${article.id}_${article.url}_${index}`} style={{
              borderRadius: 16,
              boxShadow: '0 8px 24px rgba(255,255,255,0.08)',
              backgroundColor: '#1e1e1e',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <NewsCardWeb article={article} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && news.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: 80,
            color: '#bbb',
            fontSize: 20,
            fontWeight: '600',
            userSelect: 'none',
          }}
        >
          Nothing found 🤷‍♂️
        </div>
      )}

      {/* Load More Button */}
      {!loading && news.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <button
            onClick={onLoadMore}
            style={{
              padding: '14px 36px',
              fontSize: 18,
              borderRadius: 30,
              border: 'none',
              backgroundColor: '#1e88e5',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '700',
              boxShadow: '0 6px 20px rgba(30,136,229,0.35)',
              transition: 'background-color 0.3s, box-shadow 0.3s',
              userSelect: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#1565c0';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(21,101,192,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#1e88e5';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(30,136,229,0.35)';
            }}
          >
            Load more
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% {
            background-color: #444;
          }
          50% {
            background-color: #555;
          }
          100% {
            background-color: #444;
          }
        }
      `}</style>
    </div>
  );
}