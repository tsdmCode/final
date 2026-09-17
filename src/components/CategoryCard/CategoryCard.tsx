import { useNavigate } from 'react-router';
import type { JobCategoryWithCount } from '../../types/types';
import style from './categorycard.module.scss';

export default function CategoryCard({ category }: { category: JobCategoryWithCount }) {
  const navigate = useNavigate()
  
  return (
    <div onClick={() => navigate(`/searchresults?category=${category.id}`)} className={style.categorycardStyle}>
      <p>{category.name}</p>
      <p>{category.jobCount}</p>
    </div>
  );
}
