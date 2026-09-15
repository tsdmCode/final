import { useNavigate, useSearchParams } from 'react-router';
import style from './searchcomponent.module.scss';
import { useFetch } from '../../hooks/useFetch';
import type { Category, Region, WorkType } from '../../types/types';
import { useState } from 'react';
/*
Under søgeren findes
filtreringen.
Man skal kunne filtrere på følgende:
o Geografi
o Job Kategori
o Arbejdstid (Deltid, Fuldtid, Flex)
o Periode (Seneste uge, seneste måned, seneste år)
7
o Hjemmearbejde (On-site, Remote, Hybrid)
Søger brugeren på noget tages de til søgeresultat siden og resultaterne vises.
Derudover skal der være en ”nulstil” knap til at fjerne alle filtrerings kriterier.
Filtrerer brugeren og trykker søg, uden at skrive noget i søgefeltet skal der filtreres i
alle annoncer.
*/

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

    navigate(`/searchresults?${params.toString()}`);
  }

  return (
    <div className={style.searchcomponentStyle}>
      <h2>Søg frivilligt arbejde</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <input type="submit" value={'Søg'} />
        <select onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Kategorier</option>
          {categoryData?.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
        <select onChange={(e) => setRegionId(e.target.value)}>
          <option value="">
            Region
          </option>
          {regionData?.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setWorkTypeId(e.target.value)}>
          <option value="">Arbejdstid</option>
          {workTypeData?.map((workType) => (
            <option value={workType.id}>{workType.type}</option>
          ))}
        </select>
        <select onChange={(e) => setPeriod(e.target.value)}>
          <option value="">Periode</option>
          <option value="Uge">Uge</option>
          <option value="Måned">Måned</option>
          <option value="År">År</option>
        </select>
      </form>
    </div>
  );
}
