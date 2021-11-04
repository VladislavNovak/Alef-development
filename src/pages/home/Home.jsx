import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../context/user/userContext';
import {Controls} from '../../components';
import {createEntry} from '../../utils/functions';
import {MAX_ENTRIES, USER_ENTRIES} from '../../utils/constants';
import {AlertContext} from '../../context/alert/alertContext';
import {alertStyles} from '../../context/alert/alertStyles';

const getWarningMsg = (entry) => {
  const cause = !entry.title ? `имя`: `возраст`;
  return `Внимание: ${entry.id ? `Данные ребенка (${cause}) не введены` : `Персональные данные (${cause}) не введены`}`;
};

const Home = () => {
  const {user, update} = useContext(UserContext);
  const {changeAlert, hideAlert} = useContext(AlertContext);
  const [temporary, setTemporary] = useState([...user.user]);
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    const foundEmptyEntry = temporary.find(({title, age}) => !title || !age);

    if (foundEmptyEntry) {
      changeAlert(alertStyles.WARNING, getWarningMsg(foundEmptyEntry));
    } else if (!isSaved) {
      changeAlert(alertStyles.DANGER, `Внимание: данные не сохранены`);
    } else {
      changeAlert(alertStyles.SUCCESS, `Данные успешно сохранены`);

      let timerId = setTimeout(() => {
        hideAlert();
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [temporary, user]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isSaved) setSaved(true);
    update([...temporary]);
  };

  const changeTemporaryEntry = ({target: {name, value}}, id) => {
    if (isSaved) setSaved(false);
    setTemporary([...temporary.map(item => item.id === id ? {...item, [name]: value} : item)]);
  };

  const createTemporaryEntry = () => {
    if (isSaved) setSaved(false);
    setTemporary([...temporary, createEntry(temporary)]);
  };

  const deleteTemporaryEntry = (id) => {
    if (isSaved) setSaved(false);
    setTemporary([...temporary.filter(item => item.id !== id)]);
  };

  const renderAddEntryButton = () => (
    <button
      className="children__btn-add"
      onClick={createTemporaryEntry}><span>+</span>&nbsp;Добавить ребенка</button>
  );

  const renderEntry = (entry) => (
    <li className="children__child" key={entry.id}>
      <Controls
        entry={entry}
        onInputChange={changeTemporaryEntry}
        onRemove={deleteTemporaryEntry} />
    </li>
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="visually-hidden">Страница с формой заполнения данных</h2>
      <section className="person">
        <h3>Персональные данные</h3>
        <Controls
          entry={temporary[USER_ENTRIES]}
          onInputChange={changeTemporaryEntry} />
      </section>
      <section  className="children">
        <div className="children__header">
          <h3>Дети (макс. {MAX_ENTRIES - 1})</h3>
          {temporary.length < (MAX_ENTRIES) ? renderAddEntryButton() : null}
        </div>
        <ul>
          {temporary.map(entry => (entry.id ? renderEntry(entry) : null))}
        </ul>
      </section>
      <button type="submit" className="form__btn-submit">Сохранить</button>
    </form>
  );
};

export default Home;
