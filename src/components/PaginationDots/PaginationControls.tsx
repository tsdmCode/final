import style from './paginationcontrols.module.scss';
import back from '/icons8-back-30.png';
import forward from '/icons8-forward-30.png';

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  //bare så folk ikke måske double klikker eller sådan noget, ved godt jeg har conditional rendering på
  if (totalPages <= 1) return null;

  return (
    <section className={style.paginationcontrolsStyle}>
      
        <button disabled={currentPage === 1} className={style.arrow} onClick={() => onPageChange(currentPage - 1)}>
          <img src={back} alt="En side tilbage" />
        </button>
      

      <p>Side {currentPage} af {totalPages}</p>

      {currentPage !== totalPages && (
        <button disabled={currentPage === totalPages} className={style.arrow} onClick={() => onPageChange(currentPage + 1)}>
          <img src={forward} alt="Næste side" />
        </button>
      )}
    </section>
  );
}
