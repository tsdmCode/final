import Testimonials from '../../components/Testimonials/Testimonials';
import NewsSection from '../../components/NewsSection/NewsSection';
import style from './frontpage.module.scss';
import Categories from '../../components/Categories/Categories';
// Søg og filtrering:
// Forsiden indeholder søgefeltet i toppen. Her skal brugeren kunne søge både på
// fritekst (indholdsteksten) og overskrifter til jobannoncer. Under søgeren findes
// filtreringen.
// Man skal kunne filtrere på følgende:
// o Geografi
// o Job Kategori
// o Arbejdstid (Deltid, Fuldtid, Flex)
// o Periode (Seneste uge, seneste måned, seneste år)
// 7
// o Hjemmearbejde (On-site, Remote, Hybrid)
// Søger brugeren på noget tages de til søgeresultat siden og resultaterne vises.
// Derudover skal der være en ”nulstil” knap til at fjerne alle filtrerings kriterier.
// Filtrerer brugeren og trykker søg, uden at skrive noget i søgefeltet skal der filtreres i
// alle annoncer.
// Find job ved kategori:
// Denne sektion skal indeholde alle de kategorier som findes og trykker brugeren på én
// kategori, tages de til søgeresultat siden, hvor alle jobs der matcher den valgte
// kategori vises.
// Ved hver kategori skal der også vises et tal der fortæller hvor mange jobs der er i den
// pågældende kategori.
// Udvalgte nyheder:
// Viser tre tilfældigt udvalgte nyheder. Når man klikker på én af nyhederne, skal man
// tages til nyhedssiden hvor hele nyheden vises.
export default function Frontpage() {
  return (
    <div className={style.frontpageStyle}>
      <h1>Hej</h1>
      <Categories />
      <NewsSection />
      <Testimonials />
    </div>
  );
}
