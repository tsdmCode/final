import { useContext } from 'react';
import style from './navmenu.module.scss';
import { NavLink } from 'react-router';
import { IoMdClose } from 'react-icons/io';
import { AuthContext } from '../../context/context/AuthContext';

export default function NavMenu({ setNavVis }: { setNavVis: (arg0: boolean) => void }) {
  const { userData, logout } = useContext(AuthContext);

  return (
    <div className={style.navmenuStyle}>
      <nav>
        <ul>
          <li>
            <NavLink to={'/searchresults'}>Alle jobs</NavLink>
          </li>
          <li>
            <NavLink to={'/opretannonce'}>Opret Annonce</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? style.active : '')} to={'/news/1'}>
              Nyheder
            </NavLink>
          </li>
          {userData ? (
            <>
              <li>
                <NavLink to={'/minside'}>Min side</NavLink>
              </li>
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={'/register'}>Opret Bruger</NavLink>
              </li>
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>
            </>
          )}
          {userData && (
            <>
              <li>
                <NavLink to={'/myschedule'}>My Schedule</NavLink>
              </li>
              <li onClick={logout}>Log out</li>
            </>
          )}
        </ul>

        <button onClick={() => setNavVis(false)}>
          <IoMdClose color="#fff" size={36} />
        </button>
      </nav>
    </div>
  );
}
