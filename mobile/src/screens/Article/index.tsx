import { useRoute } from '@react-navigation/native';
import ArticleView from '@mobile/widgets/article/ArticleView';
import { Article } from '@/entities/news/model/types';

export default function ArticleScreen() {
  const route = useRoute<any>();
  const p = route.params;

  const article: Article = {
    id: p.id,
    title: p.title ?? '',
    description: p.description ?? '',
    date: p.date ?? '',
    url: p.url,
    image: p.image,
  };

  return <ArticleView article={article} />;
}