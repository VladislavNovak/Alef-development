import React, {useContext, useState} from 'react';
import {UserContext} from '../../context/user/userContext';
import {Controls} from '../../components';
import {createEntry} from '../../utils/functions';
import {MAX_ENTRIES, USER_ENTRIES} from '../../utils/constants';

const Home = () => {
  const {user, update} = useContext(UserContext);
  const [temporary, setTemporary] = useState([...user.user]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    update([...temporary]);
  };

  const changeTemporaryEntry = ({target: {name, value}}, id) => {
    setTemporary([...temporary.map(item => item.id === id ? {...item, [name]: value} : item)]);
  };

  const createTemporaryEntry = () => {
    setTemporary([...temporary, createEntry(temporary)]);
  };

  const deleteTemporaryEntry = (id) => {
    setTemporary([...temporary.filter(item => item.id !== id)]);
  };

  const renderAddEntryButton = () => (
    <button
      className="children__btn-add"
      onClick={createTemporaryEntry}>+ Добавить ребенка</button>
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
