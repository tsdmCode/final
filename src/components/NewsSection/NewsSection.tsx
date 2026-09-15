import { useFetch } from '../../hooks/useFetch';
import type { Article } from '../../types/types';
import NewsItem from '../NewsItem/NewsItem';
import style from './newssection.module.scss';
import { useMemo } from 'react';
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function NewsSection() {
  const { data } = useFetch<Article[]>(import.meta.env.VITE_URL + '/api/articles');


  const news = useMemo(() => {
    if (!data) return [];
    return shuffleArray(data).slice(0, 3);
  }, [data]);

  const renderedNews = news.map((article) => <NewsItem article={article} />);

  return (
    <section className={style.newssectionStyle}>
      <h2>Udvalgte nyheder</h2>
      <article>{renderedNews}</article>
    </section>
  );
}
