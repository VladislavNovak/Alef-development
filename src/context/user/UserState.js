/* eslint-disable react/prop-types */
import React, {useReducer} from 'react';
import {createEntry} from '../../utils/functions';
import {UPDATE} from './userActions';
import {UserContext} from "./userContext";
import {userReducer} from './userReducer';

const initialState = {
  user: [
    createEntry(),
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
