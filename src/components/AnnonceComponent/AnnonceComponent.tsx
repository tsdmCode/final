import { useContext, useState } from 'react';
import type { JobListing } from '../../types/types';
import style from './annoncecomponent.module.scss';
import favorite from '../../assets/icons/icons8-favorite-50.png';
import favFilled from '../../assets/icons/icons8-favorite-filled-50.png';
import { AuthContext } from '../../context/context/AuthContext';
interface AnnonceComponentProps {
  variant: 'FAV' | 'DELETE';
}

function timeFormatter(creationTime) {
  const date = new Date(creationTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}-${year}`;

  return formattedDate;
}

export default function AnnonceComponent({ favorites, listing }: { favorites: number[]; listing: JobListing }) {
  const {userData} = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);
  let isFav = favorites.includes(listing.id);

  if (isFav) {
    console.log("hej")
  }

  async function handleFavoriteClick() {
    if (isFav) {
      await fetch(import.meta.env.VITE_URL + `/api/favorites/${listing.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${userData.accessToken}`
        }
      })
    } else {
      await fetch(import.meta.env.VITE_URL + `/api/favorites/${listing.id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${userData.accessToken}`
        },
        body: JSON.stringify({ jobListingId: listing.id})
      })
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
          {isFav ? (
            <button>
              <img src={favFilled}></img> Fjern
            </button>
          ) : (
            <button>
              <img src={favorite}></img> Gem
            </button>
          )}

          <button onClick={() => setIsOpen((prev) => !prev)}>{isOpen ? 'Luk' : 'Åben'}</button>
        </div>
      </article>
    </div>
  );
}
