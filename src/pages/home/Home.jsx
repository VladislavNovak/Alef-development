import React, {useContext} from 'react';
import {UserContext} from '../../context/user/userContext';

const Home = () => {
  const user = useContext(UserContext);

  console.log(`user in Home: `, user);

  return (
    <div>
      Домашняя страница
    </div>
  );
};

export default Home;
