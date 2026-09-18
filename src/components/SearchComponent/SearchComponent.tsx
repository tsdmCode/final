import { useNavigate, useSearchParams } from 'react-router';
import style from './searchcomponent.module.scss';
import { useFetch } from '../../hooks/useFetch';
import type { Category, Region, WorkType } from '../../types/types';
import { useState } from 'react';

export default function SearchComponent() {
  const [searchParams] = useSearchParams();
  const { data: categoryData } = useFetch<Category[]>(import.meta.env.VITE_URL + '/api/job-categories');
  const { data: regionData } = useFetch<Region[]>(import.meta.env.VITE_URL + '/api/regions');
  const { data: workTypeData } = useFetch<WorkType[]>(import.meta.env.VITE_URL + '/api/workTypes');
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [categoryId, setCategoryId] = useState(searchParams.get('category') ?? '');
  const [regionId, setRegionId] = useState(searchParams.get('region') ?? '');
  const [workTypeId, setWorkTypeId] = useState(searchParams.get('worktype') ?? '');
  const [period, setPeriod] = useState(searchParams.get('period') ?? '');
  const [workHome, setWorkHome] = useState(searchParams.get('workhome') ?? '');
  const navigate = useNavigate();

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const params = new URLSearchParams();

    if (query) {
      params.set('q', query);
    }

    if (categoryId) {
      params.set('category', categoryId);
    }

    if (regionId) {
      params.set('region', regionId);
    }

    if (workTypeId) {
      params.set('worktype', workTypeId);
    }

    if (period) {
      params.set('period', period);
    }

    if (workHome) {
      params.set('workhome', workHome);
    }

    navigate(`/searchresults?${params.toString()}`);
  }

  function resetFilters() {
    setQuery('');
    setCategoryId('');
    setWorkTypeId('');
    setRegionId('');
    setPeriod('');
    setWorkHome('');
  }

  return (
    <section className={style.searchcomponentStyle}>
      <h2>Søg frivilligt arbejde</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <input type="submit" value={'Søg'} />
      </form>
      <div className={style.filters}>
        <p>Filtrer</p>
        <select onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Kategorier</option>
          {categoryData?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setRegionId(e.target.value)}>
          <option value="">Region</option>
          {regionData?.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setWorkTypeId(e.target.value)}>
          <option value="">Arbejdstid</option>
          {workTypeData?.map((workType) => (
            <option key={workType.id} value={workType.id}>
              {workType.type}
            </option>
          ))}
        </select>
        <select onChange={(e) => setPeriod(e.target.value)}>
          <option value="">Periode</option>
          <option value="Uge">Uge</option>
          <option value="Måned">Måned</option>
          <option value="År">År</option>
        </select>
        <select onChange={(e) => setWorkHome(e.target.value)}>
          <option value="">Hjemmearbejde</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Flex">Flex</option>
        </select>
        <button onClick={resetFilters}>Nulstil</button>
      </div>
    </section>
  );
}
