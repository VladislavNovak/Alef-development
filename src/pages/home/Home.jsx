import React, {useContext, useState} from 'react';
import {UserContext} from '../../context/user/userContext';
import {Controls} from '../../components';
import {createEntry} from '../../utils/functions';
import { MAX_ENTRIES, USER_ENTRIES } from '../../utils/constants';

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
      onClick={createTemporaryEntry}>Добавить ребенка</button>
  );

  const renderEntry = (entry) => (
    <li key={entry.id}>
      <Controls
        entry={entry}
        onInputChange={changeTemporaryEntry}
        onRemove={deleteTemporaryEntry} />
    </li>
  );

  return (
    <form onSubmit={handleSubmit}>
      <section className="">
        <h2>Персональные данные</h2>
        <Controls
          entry={temporary[USER_ENTRIES]}
          onInputChange={changeTemporaryEntry} />
      </section>
      <section className="">
        <div>
          <h3>Дети (макс. {MAX_ENTRIES - 1})</h3>
          {temporary.length < (MAX_ENTRIES) ? renderAddEntryButton() : null}
        </div>
        <ul>
          {temporary.map(entry => (entry.id ? renderEntry(entry) : null))}
        </ul>
      </section>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default Home;
