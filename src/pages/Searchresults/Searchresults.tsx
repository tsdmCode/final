import { useSearchParams } from 'react-router';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { useFetch } from '../../hooks/useFetch';
import type { Fav, CategoryByID, JobListing } from '../../types/types';
import style from './searchresults.module.scss';
import HiddenHeader from '../../components/HiddenHeader/HiddenHeader';
import AnnonceComponent from '../../components/AnnonceComponent/AnnonceComponent';
import { AuthContext } from '../../context/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import PaginationControls from '../../components/PaginationDots/PaginationControls';

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
  const workHome = searchParams.get('workhome');
  const baseUrl = import.meta.env.VITE_URL + '/api/job-listings';
  const url = categoryId ? `${import.meta.env.VITE_URL}/api/job-categories/${categoryId}` : baseUrl;
  const [favorites, setFavorites] = useState<Fav[]>([]);
  const { data } = useFetch<JobListing[] | CategoryByID>(url);
  const [currentPage, setCurrentPage] = useState(1);

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
          } else {
            setFavorites([]);
          }
        })
        .catch((err) => {
          console.error('Kunne ikke få favoritter:', err);
          setFavorites([]);
        });
    }
  }, [userData]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchParams]);

  let listings = categoryId && data && !Array.isArray(data) ? data.jobListings : Array.isArray(data) ? data : [];

  if (query) {
    listings = listings.filter((listing) => listing.title.toLowerCase().includes(query.toLowerCase().trim()));
  }

  if (period) {
    const week = 1000 * 60 * 60 * 24 * 7;
    const month = 1000 * 60 * 60 * 24 * 30;
    const year = 1000 * 60 * 60 * 24 * 365;
    let filterPeriod: number = 0;

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
    if (filterPeriod > 0) {
      listings = listings.filter((listing) => checkTimeDiff(listing.createdAt, filterPeriod));
    }
  }

  if (workHome) {
    listings = listings.filter((listing) => listing.workHome === workHome);
  }

  if (regionId) {
    listings = listings.filter((listing) => listing.regionId === Number(regionId));
  }

  if (workTypeId) {
    listings = listings.filter((listing) => listing.workTypeId === Number(workTypeId));
  }

  const totalPages = Math.ceil(listings.length / 5);
  const paginatedListings = listings.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className={style.searchresultsStyle}>
      <title>Searchresults</title>
      <HiddenHeader topic="Searchresults" />
      <SearchComponent />
      <article>
        {paginatedListings?.map((listing) => (
          <AnnonceComponent favorites={favorites} key={listing.id} listing={listing} />
        ))}
      </article>
      {totalPages != 0 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
