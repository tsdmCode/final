import NewsSection from '../../components/NewsSection/NewsSection';
import style from './news.module.scss';
import type { Article } from '../../types/types';
import { useParams } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import HiddenHeader from '../../components/HiddenHeader/HiddenHeader';
// Nyhedssiden viser enten den nyhed brugeren har valgt på forsiden, eller en tilfældig
// udvalgt nyhed hvis man klikker på nyheder i navigationsmenuen.
// Under den valgte nyhed, vises alle nyheder i et grid, som anvist i designet. Klikkes der
// på en af disse skal denne vises og siden skal scrolle til toppen
export default function News() {
  const { id } = useParams();
  const { data } = useFetch<Article[]>(import.meta.env.VITE_URL + '/api/articles');
  const foundArticle = data?.find((article) => article.id === Number(id));
  console.log(foundArticle);

  if (!foundArticle) return null;

  return (
    <div className={style.newsStyle}>
      <title>Nyheder</title>
      <HiddenHeader topic="Nyheder" />
      <figure className={style.bigArticle}>
        <img src={import.meta.env.VITE_URL + foundArticle?.imageUrl} alt={foundArticle?.title} />
        <figcaption>
          <p className={style.date}>
            d.{' '}
            {Intl.DateTimeFormat('da-DK', { dateStyle: 'short' })
              .format(new Date(foundArticle?.createdAt))
              .slice(0, 5)
              .replace('.', '/')}{' '}
            {foundArticle?.author}
          </p>
          <h2>{foundArticle?.title}</h2>
          <p>{foundArticle?.content}</p>
        </figcaption>
      </figure>
      {data && <NewsSection header={'Alle nyheder'} news={data} />}
    </div>
  );
}
