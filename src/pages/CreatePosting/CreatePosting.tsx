import style from './createposting.module.scss';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import type { Category, Region } from '../../types/types';
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
  const { userData } = useContext(AuthContext);
  const { data: categoryData } = useFetch<Category[]>(import.meta.env.VITE_URL + '/api/job-categories');
  const { data: regionData } = useFetch<Region[]>(import.meta.env.VITE_URL + '/api/regions');
  //send userData.id ind som id
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [organization, setOrganization] = useState('');
  const [workHome, setWorkHome] = useState('');
  const [regionId, setRegionId] = useState('1');
  const [messageError, setMessageError] = useState('');

  function handleCreatePosting() {
    console.log('Monkey');
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
