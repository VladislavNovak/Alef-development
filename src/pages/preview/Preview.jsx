import React, {useContext} from 'react';
import {Fragment} from 'react';
import {UserContext} from '../../context/user/userContext';
import {USER_ENTRIES} from '../../utils/constants';

const Preview = () => {
  const {user} = useContext(UserContext);
  const data = [...user.user];
  console.log(`user in Preview: `, data);

  const renderPersonalData = (entry) => (
    <p>{entry.title}, {entry.age}</p>
  );

  const renderEntry = (entry) => (
    <li className="children__child" key={entry.id}>
      {entry.title}, {entry.age}
    </li>
  );

  return (
    <Fragment>
      <h2 className="visually-hidden">Страница просмотра сохраненных данных</h2>
      <section className="person">
        <h3>Персональные данные</h3>
        {(data[USER_ENTRIES] === {}) ? renderPersonalData(data[USER_ENTRIES]) : <p>Отсутствуют</p>}
      </section>
      <section  className="children">
        <h3>Дети</h3>
        {(data.length) ? (<ul>{data.map(entry => (entry.id ? renderEntry(entry) : null))}</ul>) : <p>Отсутствуют</p>}
      </section>
    </Fragment>
  );
};

export default Preview;
