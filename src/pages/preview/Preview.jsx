import React, {Fragment, useContext} from 'react';
import {UserContext} from '../../context/user/userContext';
import {USER_ENTRIES} from '../../utils/constants';

const Preview = () => {
  const {user} = useContext(UserContext);
  const data = [...user.user];

  const renderPersonalData = ({title, age}) => (
    <p>{title}, {age ? `${age} лет` : null}</p>
  );

  const renderEntry = (entry) => (
    <li className="preview__item" key={entry.id}>
      {renderPersonalData(entry)}
    </li>
  );

  return (
    <Fragment>
      <h2 className="visually-hidden">Страница просмотра сохраненных данных</h2>
      <section className="preview">
        <h3>Персональные данные</h3>
        {(data[USER_ENTRIES].age || data[USER_ENTRIES].title) ? renderPersonalData(data[USER_ENTRIES]) : <p>Отсутствуют</p>}
      </section>
      <section  className="preview">
        <h3>Дети</h3>
        {(data.length < 1) ? (<ul>{data.map(entry => (entry.id ? renderEntry(entry) : null))}</ul>) : <p>Данные отсутствуют</p>}
      </section>
    </Fragment>
  );
};

export default Preview;
