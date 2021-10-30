import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {HOME_ROUTE} from '../../routes/constants';
import {publicRoutes} from '../../routes/routes';
import {capFirstLetter} from '../../utils/functions';
import AlefIcon from '../../assets/img/Logo_imi_horizontal.png';

const Navbar = () => {
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => setClicked((prevState) => !prevState);

  return (
    <nav className="navbar" >
      <Link
        to={HOME_ROUTE}
        className="navbar__icon">
        <img className="navbar__logo" src={AlefIcon} alt="Alef development logo" width="175" height="32"/>
      </Link>
      <ul className="navbar__list">
        {publicRoutes.map(({path, title}) => (
          <li key={path} className="navbar__item">
            <NavLink to={path}
              onClick={isClicked ? handleClick : null}
              className={isClicked ? `navbar__link active` : `navbar__link`}
              activeClassName="navbar__link--selected">
                {capFirstLetter(title)}
             </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
