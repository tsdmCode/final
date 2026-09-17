import {useState } from 'react';
import style from './navmenu.module.scss';
import { NavLink } from 'react-router';
import { IoMdClose } from 'react-icons/io';

export default function NavMenu({ setNavVis }: { setNavVis: (arg0: boolean) => void }) {
  const [userData] = useState(false); //igen placeholder
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const { userData, setUserData, logout } = useContext(AuthContext);
  function logOut() {
    //placeholder
  }
  // const navigate = useNavigate();

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
            <NavLink className={({ isActive }) => (isActive ? style.active : '')} to={'/news'}>
              Nyheder
            </NavLink>
          </li>
          {userData ? (
            <>
              <li>
                <NavLink to={'/minside'}>Min side</NavLink>
              </li>
              <li onClick={logOut}>
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
              <li onClick={logOut}>Log out</li>
            </>
          )}
        </ul>

        <button onClick={() => setNavVis(false)}>
          <IoMdClose size={36} />
        </button>
      </nav>
    </div>
  );
}
