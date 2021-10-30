/* eslint-disable no-unused-vars */
import React, {useContext, useState} from 'react';
import {UserContext} from '../../context/user/userContext';
import {userFields} from '../../context/user/userFields';
import {Controls} from '../../components';
import {nextId} from '../../utils/functions';

const Home = () => {
  const {user, update} = useContext(UserContext);
  const [temporary, setTemporary] = useState(user.user);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    update([...temporary]);
  };

  const saveEntry = ({target: {name, value}}, id) => {
    setTemporary([...temporary.map(item => item.id === id ? {...item, [name]: value} : item)]);
  };

  const createEntry = () => {
    setTemporary([...temporary, {id: nextId(temporary), title: ``, age: ``,}]);
  };

  const deleteEntry = (id) => {
    setTemporary([...temporary.filter(item => item.id !== id)]);
  };

  const renderAddEntryButton = (params) => (
    <button
      onClick={createEntry}>Добавить ребенка</button>
  );


  return (
    <form onSubmit={handleSubmit}>
      <section className="">
        <h2>Персональные данные</h2>
        <Controls
          member={temporary[0]}
          onInputChange={saveEntry} />
      </section>
      <section className="">
        <div>
          <h3>Дети (макс. 5)</h3>
          {temporary.length < 6 ? renderAddEntryButton() : null}
        </div>
        <ul>
          {temporary.map(member => (
            member.id
              ? (<li key={member.id}>{
                  <Controls
                    member={member}
                    onInputChange={saveEntry}
                    onRemove={deleteEntry} />
                }</li>)
              : null))}
        </ul>
      </section>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default Home;
