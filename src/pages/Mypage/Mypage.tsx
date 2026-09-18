import { useContext, useEffect, useState } from 'react';
import UserBanner from '../../components/UserBanner/UserBanner';
import style from './mypage.module.scss';
import { AuthContext } from '../../context/context/AuthContext';
import { useNavigate } from 'react-router';
import type { Fav, JobListing } from '../../types/types';
import AnnonceComponent from '../../components/AnnonceComponent/AnnonceComponent';
import HiddenHeader from '../../components/HiddenHeader/HiddenHeader';
import { useFetch } from '../../hooks/useFetch';
import PaginationControls from '../../components/PaginationDots/PaginationControls';

export default function Mypage() {
  const [show, setShow] = useState<'favs' | 'own'>('own');
  const [favorites, setFavorites] = useState<Fav[]>([]);
  const { data: listingData } = useFetch<JobListing[]>(import.meta.env.VITE_URL + '/api/job-listings');
  const { userData, authReady } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const listings = listingData ?? [];

  useEffect(() => {
    if (!authReady) return;
    if (!userData) navigate('/', { replace: true });
  }, [userData, authReady, navigate]);

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

  const ownedListings = listings.filter((listing) => listing.userId === userData?.user.id);
  const favoriteListings = favorites.map((fav) => fav.jobListing);

  const activeListings = show === 'own' ? ownedListings : favoriteListings;
  const totalPages = Math.ceil(activeListings?.length / 5);
  
  const paginatedListings = activeListings.slice((currentPage - 1) * 5, currentPage * 5);
  return (
    <div className={style.mypageStyle}>
      <title>Min Side</title>
      <HiddenHeader topic="Min Side" />
      {userData && <UserBanner userName={userData.user.firstname} mode="minside" />}

      <div className={style.controlButtons}>
        <button className={show === 'own' ? style.active : ''} onClick={() => setShow('own')}>
          Mine annoncer
        </button>
        <button className={show === 'favs' ? style.active : ''} onClick={() => setShow('favs')}>
          Mine favoritter
        </button>
      </div>

      <article className={style.list}>
        {show === 'own' &&
          paginatedListings.map((listing) => (
            <AnnonceComponent key={listing.id} listing={listing} favorites={favorites} mode="owned" />
          ))}
        {show === 'favs' &&
          paginatedListings.map((listing) => (
            <AnnonceComponent key={listing.id} listing={listing} favorites={favorites} mode="favorite" />
          ))}
      </article>
      {totalPages != 0 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
