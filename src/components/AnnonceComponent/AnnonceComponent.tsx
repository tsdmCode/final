import { useContext, useState, useEffect } from 'react';
import type { Fav, JobListing } from '../../types/types';
import style from './annoncecomponent.module.scss';
import favorite from '../../assets/icons/icons8-favorite-50.png';
import favFilled from '../../assets/icons/icons8-favorite-filled-50.png';
import { AuthContext } from '../../context/context/AuthContext';

//todo register page og flyt det her VV OG lav noget refresh
function timeFormatter(creationTime) {
  const date = new Date(creationTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}-${year}`;

  return formattedDate;
}

export default function AnnonceComponent({
  favorites,
  listing,
  mode = 'search',
}: {
  favorites: Fav[];
  listing: JobListing;
  mode: 'search' | 'favorite' | 'owned';
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [localFav, setLocalFav] = useState(false);
  const { userData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const isFav = favorites.some((fav) => fav.jobListingId === listing.id);
  const favRecord = favorites.find((fav) => fav.jobListingId === listing.id);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalFav(favorites.some((fav) => fav.jobListingId === listing.id));
  }, [favorites, listing.id]);

  async function handleFavoriteClick() {
    if (!userData) {
      alert('Du skal lige være logget ind makker');
      return;
    }

    setIsLoading(true);
    try {
      const method = localFav ? 'DELETE' : 'POST';
      console.log(listing);
      const url =
        localFav && favRecord
          ? `${import.meta.env.VITE_URL}/api/favorites/${favRecord.id}`
          : `${import.meta.env.VITE_URL}/api/favorites`;
      const body = method === 'POST' ? JSON.stringify({ jobListingId: listing.id }) : undefined;
      console.log('Sender:', { method, url, body });
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.accessToken}`,
        },
        body,
        // body: method === 'POST' ? JSON.stringify({ jobListingId: listing.id }) : undefined,
      });
      if (!res.ok) {
        throw new Error(`Kunne ikke ${isFav ? 'fjerne' : 'tilføje'} til favoritter`);
      }
      setLocalFav(!localFav);
      alert(localFav ? 'Fjernet fra favoritter' : 'Gemt som favorit');
    } catch (error) {
      console.error('Kunne ikke opdatere favoritter:', error);
      alert('Der skete en fejl');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    setIsLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_URL + `/api/job-listings/${listing.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Kunne ikke slette`);
      }

      alert('Indslag slettet');
    } catch (error) {
      alert('Der skete en fejl');
      console.error(error);
    }
  }

  return (
    <div className={style.annoncecomponentStyle}>
      <article className={style.Info}>
        <p>{listing.organization}</p>
        <h3>{listing.title}</h3>
        <p>{listing.jobCategory.name}</p>
        <h4>Beskrivelse</h4>
        <p>{listing.description}</p>
      </article>
      <article className={style.contact}>
        <div>
          <p>Indrykket d. {timeFormatter(listing.createdAt)}</p>
          <p>Lokation: {listing.city}</p>
        </div>
        {/* {isFav && <p>HEJ HEJ DEN ER</p>} */}
        {isOpen && (
          <>
            <p>Arbejdstid: {listing.workType.type}</p>
            <p>
              Hjemmearbejde: {listing.workHome === 'remote' ? 'Ja' : listing.workHome === 'On-Site' ? 'Nej' : 'Delvis'}
            </p>
            <article>
              <h4>Kontakt</h4>
              <p>{listing.organization}</p>
              <p>
                Att. {listing.user.firstname} {listing.user.lastname}
              </p>
              <a href={`mailto:${listing.user.email}`}>Email: {listing.user.email}</a>
              <a href={`tel:+45${listing.user.phone}`}>+45 {listing.user.phone}</a>
            </article>
          </>
        )}
        <div className={style.controls}>
          {mode === 'owned' ? (
            <button disabled={isLoading} onClick={handleDelete}>
              Slet
            </button>
          ) : (
            <button disabled={isLoading} onClick={handleFavoriteClick}>
              <img src={localFav ? favFilled : favorite} alt="" /> {localFav ? 'Fjern' : 'Gem'}
            </button>
          )}

          <button disabled={isLoading} onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? 'Luk' : 'Åben'}
          </button>
        </div>
      </article>
    </div>
  );
}
