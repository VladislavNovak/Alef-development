import React, {Fragment, useContext, useEffect} from 'react';
import {AlertContext} from '../../context/alert/alertContext';
import {UserContext} from '../../context/user/userContext';
import {alertStyles} from '../../context/alert/alertStyles';
import {USER_ENTRIES} from '../../utils/constants';

const Preview = () => {
  const {user} = useContext(UserContext);
  const {alert, hideAlert} = useContext(AlertContext);
  const data = [...user.user];

  useEffect(() => {
    if (alert.style === alertStyles.SUCCESS) {

      let timerId = setTimeout(() => {
        hideAlert();
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, []);

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
        {(data.length < 2) ? <p>Данные отсутствуют</p> : (<ul>{data.map(entry => (entry.id ? renderEntry(entry) : null))}</ul>)}
      </section>
    </Fragment>
  );
};

export default Preview;
