import React from 'react';
import {NavLink} from "react-router-dom";
import {publicRoutes} from '../../routes/routes';

const Navbar = () => {
  return (
    <nav className="navbar" >
      <p className="navbar__icon">Alef icon</p>
      <ul className="navbar__list">
        {publicRoutes.map(({path, title}) => (
          <li key={path} className="navbar__item">
             <NavLink to={path}>
               {title}
             </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
