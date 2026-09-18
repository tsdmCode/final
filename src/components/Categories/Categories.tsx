import { useFetch } from '../../hooks/useFetch';
import type { JobCategoryWithCount } from '../../types/types';
import CategoryCard from '../CategoryCard/CategoryCard';
import style from './categories.module.scss';

export default function Categories() {
  const { data } = useFetch<JobCategoryWithCount[]>(import.meta.env.VITE_URL + '/api/job-categories-count');

  const renderedCategories = data?.map((category) => <CategoryCard category={category} />);
  
  return (
    <section className={style.categoriesStyle}>
      <h2>Kategorier</h2>
      <div className={style.categoryGrid}>{renderedCategories}</div>
    </section>
  );
}
