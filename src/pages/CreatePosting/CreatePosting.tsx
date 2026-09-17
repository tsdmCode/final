import style from './createposting.module.scss';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import type { Category, Region } from '../../types/types';
import { useNavigate } from 'react-router';
// Opret annonce siden består af en header der viser noget tekst og en formular, som
// anvist i designet. For at oprette en annonce skal man være logget ind. Du skal derfor
// gøre brugeren opmærksom på at de skal logge ind før de kan oprette en annonce.
// På siden skal der være en form der indeholder følgende elementer:
// - Overskrift
// - Organisation / Forening
// - Lokation
// - Kategori
// - Arbejdstid
// - Adresse
// - Postnummer
// - By
// Der skal være validering på alle felter i denne form og der skal gives besked til
// brugeren om hvilke felter de har udfyldt forkert samt hvorfor.
// Når man trykker ”Opret annonce” skal alt information sendes til API´et hvor annoncen
// gemmes og brugeren får en besked om at de har oprettet en annonce
export default function CreatePosting() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const { data: categoryData } = useFetch<Category[]>(import.meta.env.VITE_URL + '/api/job-categories');
  const { data: regionData } = useFetch<Region[]>(import.meta.env.VITE_URL + '/api/regions');
  //send userData.id ind som id
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [organization, setOrganization] = useState('');
  const [workHome, setWorkHome] = useState('');
  const [workTypeId, setWorkTypeId] = useState('');
  const [regionId, setRegionId] = useState('');
  const [messageError, setMessageError] = useState('');
  async function handleCreatePosting() {
    if (!userData) {
      alert('Log lige ind først');
    }
    const noSpecials = /^[^A-Zz-z0-9\s]$/;
    const descriptionRegex = /^[^A-Zz-z0-9\s.,]$/;
    const zipCodeRegex = /^[0-9]{4}$/;
    //description, address, zipcode, city, organization, workHome, regionId
    if (!title.trim()) {
      setMessageError('Manglende titel');
      return;
    } else if (title.length < 3) {
      setMessageError('Titel for kort');
      return;
    } else if (noSpecials.test(title)) {
      setMessageError('Mærkelig titel, kun normale tegn tak!');
      return;
    }

    if (!categoryId) {
      setMessageError('Venligst vælg en kategori');
      return;
    }
     if (!city.trim()) {
      setMessageError("Husk at skrive en by ind");
      return
    } else if (noSpecials.test(city)) {
      setMessageError("Ingen specialtegn i by tak")
      return;
    }
    if (!address.trim()) {
      setMessageError('Indtast en addresse');
      return;
    } else if (noSpecials.test(address)) {
      setMessageError('Mærkelig addresse');
      return;
    }

    if (!description.trim()) {
      setMessageError('Venligst skriv noget i beskrivelse');
      return;
    } else if (descriptionRegex.test(description)) {
      setMessageError('Undgå for mange special tegn i beskrivelsen.');
      return;
    }

    if (!zipCodeRegex.test(zipcode)) {
      setMessageError('Indtast venligt et gyldigt postnummer');
      return;
    }

    if (!regionId) {
      setMessageError('Vælg en lokation');
      return;
    }

    if (!workTypeId) {
      setMessageError("Vælg venligst en type arbejde")
      return;
    }

    try {
      await fetch(import.meta.env.VITE_URL + '/api/job-listings', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          jobCategoryId: categoryId,
          description,
          regionId,
          city,
          address,
          organization,
          workTypeId,
          workHome,
          zipcode,
          userId: userData.user.id,
        }),
      });

      alert('Annonce oprettet');
      setTimeout(() => {
        navigate('/minside');
      }, 3000);
    } catch (error) {
      console.error('Kunne ikke opdatere favoritter:', error);
      alert('Der skete en fejl');
    }
  }

  return (
    <div className={style.createpostingStyle}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreatePosting();
        }}
        noValidate
      >
        {messageError && <p className={style.errorMessage}>{messageError}</p>}
        <div className={style.grid}>
          <div>
            <span>
              <label htmlFor="title">Overskrift</label>
              <input id="title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </span>
            <span>
              <label htmlFor="kategori">Kategori</label>

              <select name="kategori" onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Kategorier</option>
                {categoryData?.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </select>
            </span>
            <span>
              <label htmlFor="region">Region</label>
              <select name="region" onChange={(e) => setRegionId(e.target.value)}>
                <option value="">Region</option>
                {regionData?.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </span>
            <span>
              <label htmlFor="address">Adresse</label>
              <input
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </span>
            <span>
              <label htmlFor="zipcode">Postnummer</label>
              <input
                id="zipcode"
                type="text"
                name="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </span>
            <span>
              <label htmlFor="city">By</label>
              <input id="city" type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </span>
            <span>
              <label htmlFor="organization">Organisation</label>
              <input
                id="organization"
                type="text"
                name="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </span>
            <span>
              <label htmlFor="workHome">Arbejde / Hjem</label>
              <select id="workHome" name="workHome" value={workHome} onChange={(e) => setWorkHome(e.target.value)}>
                <option value="">Vælg...</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </span>
            <span>
              <label htmlFor="workType">Tid</label>
              <select id="workType" name="workType" value={workTypeId} onChange={(e) => setWorkTypeId(e.target.value)}>
                <option value="">Vælg...</option>
                <option value="1">Fuldtid</option>
                <option value="2">Deltid</option>
                <option value="3">Flex</option>
              </select>
            </span>
          </div>
          <div>
            <span>
              <label htmlFor="description">Beskrivelse</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </span>
          </div>
        </div>

        <input type="submit" value={'Opret'}></input>
      </form>
    </div>
  );
}
