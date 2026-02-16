import { useRoute } from '@react-navigation/native';
import ArticleView from '@/widgets/article/ArticleView';
import { Article } from '@/entities/news/model/types';

export default function ArticleScreen() {
  const route = useRoute<any>();

  const article: Article = {
    id: route.params.id,
    title: route.params.title,
    description: route.params.description,
    date: route.params.date,
    url: route.params.url,
  };

  return <ArticleView article={article} />;
}