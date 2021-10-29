/* eslint-disable no-unused-vars */
import React, {useContext, useState} from 'react';
import {UserContext} from '../../context/user/userContext';
import {userFields} from '../../context/user/userFields';
import {Controls} from '../../components';

const initialState = {
  userFieldsX: {
    title: `Adrian`,
    age: 25,
  },
  children: [{userFields}],
};

const Home = () => {
  const {user} = useContext(UserContext);
  const {userFieldsX, children} = user;

  const [inputData, setInputData] = useState(initialState);

  const handleInputChange = ({target: {name, value}}) => {
    setInputData({...inputData, [name]: value});
  };

  const handleRemove = (id) => {
    console.log(id);
  };

  const renderChildren = (children) => {
    return (
      <ul>{
        children.map(child => (
          <li key={child.id}>{
            <Controls
              userFieldsX={child}
              onInputChange={handleInputChange}
              onRemove={handleRemove} />
          }</li>
        ))
      }</ul>
    );
  };

  return (
    <form>
      <section>
        <p>Персональные данные</p>
          <Controls
            userFieldsX={userFieldsX}
            onInputChange={handleInputChange}
            onRemove={handleRemove} />
      </section>
      <section>
        <p>
          <span>Дети (макс. 5)</span>
          <button>Добавить ребенка</button>
        </p>
        {children.length ? renderChildren(children) : null}
      </section>
    </form>
  );
};

export default Home;
