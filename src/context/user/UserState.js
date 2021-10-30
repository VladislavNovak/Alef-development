/* eslint-disable react/prop-types */
import React, {useReducer} from 'react';
import {UPDATE} from './userActions';
import {UserContext} from "./userContext";
import {userReducer} from './userReducer';

const initialState = {
  user: [
  {id: 0, title: `Иван`, age: `25`,},
  {id: 1, title: `Мария`, age: `5`,},
  {id: 2, title: `Тимофей`, age: `7`,},
  {id: 3, title: `Владимир`, age: `2`,},
]};

export const UserState = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const update = (payload) => {
    dispatch({
      type: UPDATE,
      payload,
    });
  };

  return (
    <UserContext.Provider value={{update, user: state}} >
      {children}
    </UserContext.Provider>
  );
};
