import { useSearchParams } from 'react-router';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { useFetch } from '../../hooks/useFetch';
import type { CategoryByID, JobListing } from '../../types/types';
import style from './searchresults.module.scss';
// Trykker brugeren på ”Alle jobs” i navigationsmenuen tages de til søgeresultat siden,
// uden nogle søgekriterier. Det vil sige at alle jobannoncer vises når brugeren ikke har
// søgt på noget.
// Øverst på søgeresultat siden vises søgeren med tilhørende filtrering.
// 8
// Hver jobannonce har to knapper. En ”Gem” knap og en ”Åben” knap. Gem knappen
// skal gemme annoncen i brugerens favoritter. Dette kan gøres gennem API´et men det
// kræver at brugeren er logget ind. Der skal derfor vises en besked til brugeren om at
// de skal logge ind før de kan gemme en jobannonce. Det er op til dig at designe denne
// del

function checkTimeDiff(timeStamp: string, period: number): boolean {
  const pastDate: Date = new Date(timeStamp);
  const currentDate: Date = new Date();
  const diffMs: number = currentDate.getTime() - pastDate.getTime();
   console.log({
    timeStamp,
    pastDate: pastDate.toString(),
    diffMs,
    period,
    result: diffMs <= period,
  });
  return diffMs <= period;
}

export default function Searchresults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const categoryId = searchParams.get('category');
  const regionId = searchParams.get('region');
  const period = searchParams.get('period');
  const baseUrl = import.meta.env.VITE_URL + '/api/job-listings';
  const url = categoryId ? `${import.meta.env.VITE_URL}/api/job-categories/${categoryId}` : baseUrl;
  const { data } = useFetch<JobListing[] | CategoryByID>(url);

  let listings = categoryId && data && !Array.isArray(data) ? data.jobListings : Array.isArray(data) ? data : [];

  if (query) {
    listings = listings.filter((listing) => listing.title.toLowerCase().includes(query.toLowerCase().trim()));
  }

  if (period) {
    const week = 60 * 1000 * 24 * 7;
    const month = 60 * 1000 * 24 * 30;
    const year = month * 12;
    let filterPeriod: number;

    switch (period) {
      case 'Uge':
        filterPeriod = week;
        break;
      case 'Måned':
        filterPeriod = month;
        break;
      case 'År':
        filterPeriod = year;
        break;
      default:
        break;
    }
    
    listings = listings.filter((listing) => checkTimeDiff(listing.createdAt, filterPeriod))
  }

  if (regionId) {
    listings = listings.filter((listing) => listing.regionId === Number(regionId));
  }

  return (
    <div className={style.searchresultsStyle}>
      <SearchComponent />

      {listings?.map((listing) => (
        <h2>
          {listing.title} {listing.jobCategory.name}
        </h2>
      ))}
    </div>
  );
}
