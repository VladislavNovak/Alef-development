import React, {useContext} from 'react';
import {UserContext} from '../../context/user/userContext';

const Preview = () => {
  const user = useContext(UserContext);
  console.log(`user in Preview: `, user);

  return (
    <div>
      Страница Превью
    </div>
  );
};

export default Preview;
