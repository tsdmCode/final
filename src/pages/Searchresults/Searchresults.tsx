import { useSearchParams } from 'react-router';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { useFetch } from '../../hooks/useFetch';
import type { Fav, CategoryByID, JobListing, UserData } from '../../types/types';
import style from './searchresults.module.scss';
import HiddenHeader from '../../components/HiddenHeader/HiddenHeader';
import AnnonceComponent from '../../components/AnnonceComponent/AnnonceComponent';
import { AuthContext } from '../../context/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
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

  return diffMs <= period;
}

export default function Searchresults() {
  const { userData } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const categoryId = searchParams.get('category');
  const regionId = searchParams.get('region');
  const period = searchParams.get('period');
  const workTypeId = searchParams.get('worktype');
  const baseUrl = import.meta.env.VITE_URL + '/api/job-listings';
  const url = categoryId ? `${import.meta.env.VITE_URL}/api/job-categories/${categoryId}` : baseUrl;
  const [favorites, setFavorites] = useState<Fav[]>([]);
  const { data } = useFetch<JobListing[] | CategoryByID>(url);

  useEffect(() => {
    if (userData) {
      fetch(import.meta.env.VITE_URL + '/api/favorites', {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data: Fav[]) => {
          if (Array.isArray(data)) {
            setFavorites(data);
            console.log("array data:", data)
          } else {
            setFavorites([]);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch favorites:', err);
          setFavorites([]);
        });
    }
  }, [userData]);

  let listings = categoryId && data && !Array.isArray(data) ? data.jobListings : Array.isArray(data) ? data : [];

  if (query) {
    listings = listings.filter((listing) => listing.title.toLowerCase().includes(query.toLowerCase().trim()));
  }

  if (period) {
    const week = 1000 * 60 * 60 * 24 * 7;
    const month = 1000 * 60 * 60 * 24 * 30;
    const year = 1000 * 60 * 60 * 24 * 365;
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

    listings = listings.filter((listing) => checkTimeDiff(listing.createdAt, filterPeriod));
  }

  if (regionId) {
    listings = listings.filter((listing) => listing.regionId === Number(regionId));
  }

  if (workTypeId) {
    listings = listings.filter((listing) => listing.workTypeId === Number(workTypeId));
  }

  return (
    <div className={style.searchresultsStyle}>
      <SearchComponent />
      <HiddenHeader topic="Hej" />
      <article>
        {listings?.map((listing) => (
          <AnnonceComponent favorites={favorites} key={listing.id} listing={listing} />
        ))}
      </article>
    </div>
  );
}
