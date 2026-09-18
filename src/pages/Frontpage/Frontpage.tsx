import Testimonials from '../../components/Testimonials/Testimonials';
import NewsSection from '../../components/NewsSection/NewsSection';
import style from './frontpage.module.scss';
import Categories from '../../components/Categories/Categories';
import HiddenHeader from '../../components/HiddenHeader/HiddenHeader';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { useMemo } from 'react';
import { useFetch } from '../../hooks/useFetch';
import type { Article } from '../../types/types';
import { shuffleArray } from '../../lib/shuffleArray';

export default function Frontpage() {
  const { data } = useFetch<Article[]>(import.meta.env.VITE_URL + '/api/articles');

  const news = useMemo(() => {
    if (!data) return [];
    return shuffleArray(data).slice(0, 3);
  }, [data]);
  return (
    <div className={style.frontpageStyle}>
      <title>Gratissimo</title>
      <HiddenHeader topic="Gratissimo" />
      <SearchComponent />
      <Categories />
      <NewsSection header={'Udvalgte nyheder'} news={news} />
      <Testimonials />
    </div>
  );
}
